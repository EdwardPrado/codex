import React, { FC, useEffect, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "../theme"
import { Alert, Button, LoadingOverlay, Screen, Text } from "app/components"
import { BookPlus } from "@tamagui/lucide-icons"
import { navigate } from "app/navigators"
import { supabase } from "app/services/auth/supabase"
import { useAuth } from "app/services/auth/useAuth"
import { DeckListItem } from "app/components/DeckListItem"

export const DeckScreen: FC = (navigation) => {
  const [decks, setDecks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()

  async function fetchDecks() {
    setIsLoading(true)
    try {
      let { data, error } = await supabase
        .from("decks")
        .select(
          `id, created_at, name, user_id, formats (id, name, abbreviation), art_crops (id, crop_url, banner_url)`,
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
