import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import { Pressable, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage, CardListItem, Icon, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { colors, spacing } from "../theme"
import { XStack, Input } from "tamagui"
import { createClient } from "@supabase/supabase-js"

const API_KEY = ""
const API_URL = "http://10.0.2.2:54321"
const supabase = createClient(API_URL, API_KEY)

const SUPPORTED_SETS = {
  MST: "MST",
  TCC: "TCC",
  UPR: "UPR",
  WTR: "WTR",
  EVO: "EVO",
  DYN: "DYN",
  DTD: "DTD",
  CRU: "CRU",
  ARC: "ARC",
  HVY: "HVY",
  ELE: "ELE",
  MON: "MON",
  EVR: "EVR",
  OUT: "OUT",
  DVR: "DVR",
  LEV: "LEV",
  PSM: "PSM",
  RVD: "RVD",
  AUR: "AUR",
  TER: "TER",
}

let typingTimer: ReturnType<typeof setTimeout>

export const CardSearchScreen: FC<TabScreenProps<"Search">> = observer(function CardSearchScreen(
  _props,
) {
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedCard, setHighlightedCard] = useState()
  const [results, setResults] = useState([])

  const handleSearchQuery = (searchQuery: string) => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
      setSearchQuery(searchQuery)
    }, 1000)
  }

  const cardColor = (pitch: number) => {
    let hex = ""

    switch (pitch) {
      case 1:
        hex = "#c70e09"
        break
      case 2:
        hex = "#ffef00"
        break
      case 3:
        hex = "#0091d8"
        break
    }

    return hex
  }

  const pitchIcon = (pitchNumber: number) => {
    switch (pitchNumber) {
      case 1:
        return <Icon size={24} icon={"pitch1"} />
      case 2:
        return <Icon size={24} icon={"pitch2"} />
      case 3:
        return <Icon size={24} icon={"pitch3"} />
      default:
        return null
    }
  }

  const handleHighlightedCard = (card) => {
    //TODO:  Filter card_printings by supported set IDs then select from the filtered array
    const supportedPrintings = card.card_printings.filter(
      (printing) => SUPPORTED_SETS[printing.set_id] !== undefined,
    )

    console.log("All Printings: ", card.card_printings)
    console.log("Supported Printings: ", supportedPrintings)

    setHighlightedCard({
      card_id: supportedPrintings[0].card_id,
      set_id: supportedPrintings[0].set_id,
    })
  }

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("cards")
        .select("unique_id, name, pitch, cost, type_text, card_printings(card_id, set_id)")
        .ilike("name", `%${searchQuery}%`)

      if (error) {
        console.error(`Error: ${JSON.stringify(error, null, 2)}`)
      } else {
        console.log(JSON.stringify(data, null, 2))
        console.log("Results: ", JSON.stringify(data, null, 2))
        setResults(data)
      }
    }

    if (searchQuery) {
      fetchArtists()
    }
  }, [searchQuery])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <XStack alignItems="center" space="$2">
        <Input
          flex={1}
          size={"$4"}
          placeholder="Search card name"
          onChangeText={(value) => handleSearchQuery(value)}
        />
      </XStack>
      <View>
        {searchQuery && (
          <>
            <Text style={$searchSummary}>
              <Text style={$searchSummaryBold}>{results.length} cards</Text> matching
              {' "' + searchQuery + '" '}
              were found.
            </Text>

            <ScrollView>
              {results.map((card) => (
                <CardListItem
                  topSeparator
                  key={card.unique_id}
                  RightComponent={
                    <View
                      style={{
                        flexGrow: 0,
                        flexBasis: 120,
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        overflow: "hidden",
                        justifyContent: "flex-end",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      {card.cost !== undefined ? (
                        <>
                          {card.pitch && pitchIcon(card.pitch)}

                          {cardColor(Number(card.pitch)) && (
                            <Icon
                              size={24}
                              icon={"cost"}
                              color={cardColor(Number(card.pitch))?.toString()}
                              style={{
                                borderWidth: 1,
                                borderColor: colors.palette.secondary100,
                                borderRadius: 100,
                              }}
                            />
                          )}
                          <View
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              alignContent: "flex-end",
                            }}
                          >
                            {card.cost && <Text>{card.cost} </Text>}

                            <Icon size={24} icon={"cost"} />
                          </View>
                        </>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                  }
                  onPress={() => {
                    handleHighlightedCard(card)
                  }}
                >
                  <View>
                    <Text style={$cardMaintext}>{card.name}</Text>
                    <Text style={$cardSubtext}>{card.type_text}</Text>
                  </View>
                </CardListItem>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {highlightedCard !== undefined && (
        <View style={$cardHighlightWrapper}>
          <Pressable onPress={() => setHighlightedCard()}>
            <View style={$cardHighlight}>
              <AutoImage
                maxWidth={280}
                source={{
                  uri: `${API_URL}/storage/v1/object/public/assets/${highlightedCard.set_id}/${highlightedCard.card_id}.png`,
                }}
              />
            </View>
          </Pressable>
        </View>
      )}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const $searchSummary: TextStyle = {
  paddingVertical: spacing.md,
  fontSize: 16,
}

const $searchSummaryBold = {
  fontWeight: "700",
  fontSize: 16,
}

const $cardSubtext: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
}

const $cardMaintext: TextStyle = {
  fontSize: 14,
}

const $cardHighlightWrapper: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  zIndex: 9999,
}

const $cardHighlight: ViewStyle = {
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}
