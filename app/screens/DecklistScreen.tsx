import React, { FC, useCallback, useEffect, useState } from "react"
import { FlatList, ImageStyle, ScrollView, TextStyle, View, ViewStyle, Image } from "react-native"
import { colors, spacing } from "../theme"
import { Alert, Button, ListItem, LoadingOverlay, Screen, Text } from "app/components"
import { BookPlus, Upload } from "@tamagui/lucide-icons"
import * as Clipboard from "expo-clipboard"
import { navigate } from "app/navigators"
import { supabase } from "app/services/auth/supabase"
import { useAuth } from "app/services/auth/useAuth"
import { DeckListItem } from "app/components/DeckListItem"

type CardEntry = {
  amount: number
  name: string
  pitch: number | null
  isHero?: boolean
}

type ImportedDeckList = Array<CardEntry>

const roundedBracketsRegex = new RegExp(/\(([^)]+)\)/g)
const heroRegex = new RegExp(/Hero:\s*(.*)/)
const amountRegex = new RegExp(/\d x/)
const pitchRegex = new RegExp(/\(([^)]+)\)/g)

const sanitizedInput = async (rawInput: string): Promise<string> => {
  const isFabrary: boolean = !!rawInput.match(/Deck built with ❤️ at the FaBrary/)

  rawInput = rawInput
    .trim()
    .trimEnd()
    .replaceAll("Hero: ", "Hero\n")
    .replaceAll("Weapons: ", "Weapons\n")
    .replaceAll("Equipment: ", "Equipment\n")
    .replaceAll("(Red)", "(red)")
    .replaceAll("(Blue)", "(blu)")
    .replaceAll("(Yellow)", "(yel)")
    .replaceAll("(red)", "(red)")
    .replaceAll("(blue)", "(blu)")
    .replaceAll("(yellow)", "(yel)")
    .replaceAll("[0]", "0 x")
    .replaceAll("[1]", "1 x")
    .replaceAll("[2]", "2 x")
    .replaceAll("[3]", "3 x")
    .replaceAll("(0)", "0 x")
    .replaceAll("(1)", "1 x")
    .replaceAll("(2)", "2 x")
    .replaceAll("(3)", "3 x")

  let rawInputArray = rawInput.split("\n")
  let sanitizedInputArray = []

  let { data, error } = await supabase.rpc("getCommaWeapons")
  if (error) console.error(error)

  const commaWeapons = data

  for (let i = 0; i < rawInputArray.length; i++) {
    if (
      rawInputArray[i] !== "Deck built with ❤️ at the FaBrary" &&
      rawInputArray[i] !== "Deck build - via https://fabdb.net :" &&
      rawInputArray[i] !== "" &&
      !rawInputArray[i].match(/See the full deck/) &&
      !rawInputArray[i].match(/Class: /) &&
      !rawInputArray[i].match(/0 x/)
    ) {
      const lastIndex = rawInputArray[i - 1]

      if (lastIndex === "Equipment") {
        const equipment = rawInputArray[i].split(", ")

        for (let j = 0; j < equipment.length; j++) {
          sanitizedInputArray.push(equipment[j])
        }
      } else if (lastIndex === "Weapons") {
        let weaponsEntry = rawInputArray[i]

        for (let j = 0; j < commaWeapons.length; j++) {
          if (weaponsEntry.includes(commaWeapons[j])) {
            sanitizedInputArray.push(commaWeapons[j])
            weaponsEntry = weaponsEntry.replaceAll(commaWeapons[j], "")
          }
        }

        //Filter in case there were 2 weapons when grabbing commaWeapon
        const weapons = weaponsEntry.split(",").filter((weapon) => weapon !== "")

        for (let j = 0; j < weapons.length; j++) {
          sanitizedInputArray.push(weapons[j].trim())
        }
      } else {
        sanitizedInputArray.push(rawInputArray[i])
      }

      //Add a blank line between sections for formatting
      if (
        (i !== 0 && lastIndex === "Hero") ||
        (i !== 0 && lastIndex === "Weapons") ||
        (i !== 0 && lastIndex === "Equipment")
      ) {
        sanitizedInputArray.push("")
      }
    }
  }

  //Removes the deck title
  if (isFabrary) {
    sanitizedInputArray.splice(0, 1)
  }

  const heroText = sanitizedInputArray[0].match(heroRegex)
  const heroBracketsText = sanitizedInputArray[0].match(roundedBracketsRegex)

  if (heroText) {
    sanitizedInputArray[0] = `Hero\n${heroText[0].replaceAll("Hero: ", "")}\n`
  } else if (heroBracketsText) {
    sanitizedInputArray[0] = `Hero\n${heroBracketsText[0]
      .replaceAll("(", "")
      .replaceAll(")", "")}\n`
  }

  const sanitizedInput = sanitizedInputArray.join("\n")

  return sanitizedInput
}

//TODO: Output error message if decklist is incompatible
const parseCards = (rawInput: string): Array<CardEntry> => {
  let sanitizedInput = rawInput
    .replaceAll("Hero", "")
    .replaceAll("Equipment", "")
    .replaceAll("Weapons", "")
    .replaceAll("", "")
    .replaceAll("", "")
    .trim()
    .split("\n")
    .filter((card) => card !== "")

  let cardEntries: Array<CardEntry> = []

  for (let i = 0; i < sanitizedInput.length; i++) {
    let entry = sanitizedInput[i]
    let amount = 1
    let pitch = null
    let isHero = false

    //TODO:  Have a better way to identify the hero that's tied to the text immediatelly following the hero line
    if (i === 0) {
      isHero = true
    }

    if (entry.match(amountRegex)) {
      amount = Number(Array.from(entry)[0])
    }

    const color = entry.match(pitchRegex)
    const rawPitch = color === null ? null : color[0]

    entry = entry.replace(amountRegex, "")
    entry = entry.replaceAll(pitchRegex, "").trim()

    switch (rawPitch) {
      case "(red)":
        pitch = 1
        break
      case "(yel)":
        pitch = 2
        break
      case "(blu)":
        pitch = 3
        break
    }

    cardEntries.push({ amount: amount, name: entry, pitch: pitch, isHero: isHero })
  }

  return cardEntries
}

const fetchCards = async (parsedCards: Array<CardEntry>): Promise<[]> => {
  let { data, error } = await supabase.rpc("getDeckListRecords", {
    decklist: parsedCards,
  })
  if (error) console.error(error)
  else console.log(JSON.stringify(data, null, 2))

  return []
}

export const DecklistScreen: FC = (navigation) => {
  const [decks, setDecks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()

  async function fetchDecks() {
    setIsLoading(true)
    try {
      let { data, error } = await supabase
        .from("decks")
        .select(
          `id, created_at, name, user_id, formats (id, abbreviation), art_crops (id, image_url)`,
        )
        .eq("user_id", `${user?.id}`)

      if (error) console.log(error)
      else {
        setDecks(data)
      }
    } catch (e) {}
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDecks()
  }, [])

  const handleImport = async (): Promise<ImportedDeckList> => {
    let convertedDecklist: ImportedDeckList = []

    try {
      const rawInput = await Clipboard.getStringAsync()
      const sanitizedDeckList = sanitizedInput(rawInput)
      const parsedCards = parseCards(await sanitizedDeckList)

      fetchCards(parsedCards)
    } catch (e) {}

    return convertedDecklist
  }

  //const renderItems = useCallback(({ items }) => {
  //  return <>
  //  {items.map((item) => <DeckListItem deck={item} />)}
  //  </>
  //}, [])

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$tabBar}>
        <Text preset="subheading" style={$tabBarText}>
          Decks
        </Text>
      </View>

      <Button onPress={() => fetchDecks()}>Fetch Decks</Button>

      {isLoading && <LoadingOverlay />}

      {decks.length === 0 && (
        <Alert message="You haven't created any decks yet.  Once you have, you'll see the decks below." />
      )}

      <Button onPress={() => handleImport()}>
        <Upload />
      </Button>

      {decks.length > 0 && (
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <DeckListItem deck={item} onPress={() => navigate("ViewDeck", { deck: item })} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <Button style={$cornerButton} onPress={() => navigate("AddDeck")}>
        <BookPlus />
      </Button>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const $tabBar: ViewStyle = {
  marginVertical: spacing.sm,
}

const $tabBarText: TextStyle = {
  fontSize: spacing.xl,
}

const $cornerButton: ViewStyle = {
  position: "absolute",
  bottom: spacing.md,
  right: spacing.md,
  gap: spacing.sm,
}
