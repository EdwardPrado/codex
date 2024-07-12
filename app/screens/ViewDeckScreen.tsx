import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ViewStyle, Image, ImageStyle, View, TextStyle } from "react-native"
import { EditNameDialog, ListItem, Screen, StackNavbar, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { colors, spacing } from "../theme"
import { navigate } from "app/navigators"
import { LinearGradient } from "expo-linear-gradient"
import { ChevronRight } from "@tamagui/lucide-icons"

export const ViewDeckScreen: FC<TabScreenProps<"ViewDeck">> = observer(function ViewDeckScreen(
  _props,
) {
  const { id, created_at, name, art_crops, formats } = _props?.route.params.deck

  const [cards, setCards] = useState<any[]>([])

  const fetchCards = async (): Promise<[]> => {
    return []
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <StackNavbar text="Manage Deck" overrideBack={() => navigate("Decklist")} />
      <View style={$bannerContainer}>
        <Image style={$imageStyle} source={{ uri: art_crops.banner_url }} />
        <View style={$bannerTextContainer}>
          <LinearGradient
            style={$gradient}
            colors={["transparent", colors.background, colors.background]}
          >
            <Text preset="bold" style={$bannerHeader}>
              {name}
            </Text>
            <Text style={$bannerSubheader}>{formats.name}</Text>
          </LinearGradient>
        </View>
      </View>
      <View style={$pageContainer}>
        {!art_crops?.banner_url && (
          <>
            <Text preset="bold" style={$bannerHeader}>
              {name}
            </Text>
            <Text style={$bannerSubheader}>{formats.name}</Text>
          </>
        )}
        <Text preset="bold">Deck Options</Text>
        <EditNameDialog name={name} id={id} />
        <View>
          <ListItem
            LeftComponent={
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={$itemLabelContainer}>
                  <Text preset="bold">Deck List</Text>
                </View>
                <View style={$itemNameContainer}>
                  <Text style={$itemName}>{cards.length} cards</Text>
                </View>
                <View style={$iconContainer}>
                  <ChevronRight />
                </View>
              </View>
            }
            onPress={() => navigate("DeckList", { id: id })}
          />
        </View>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  height: "100%",
}

const $pageContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $bannerContainer: ViewStyle = {
  marginTop: 40,
}

const $bannerTextContainer: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
}

const $bannerHeader: TextStyle = {
  fontSize: 24,
}

const $bannerSubheader: TextStyle = {
  fontSize: 16,
}

const $gradient: ViewStyle = {
  height: 80,
  display: "flex",
  justifyContent: "flex-end",
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.lg,
}

const $imageStyle: ImageStyle = {
  width: "100%",
  height: undefined,
  aspectRatio: 1,
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
}

const $itemLabelContainer: TextStyle = {
  justifyContent: "center",
}

const $itemNameContainer: ViewStyle = {
  flex: 1,
  margin: spacing.sm,
}

const $itemName: TextStyle = {
  textAlign: "right",
}
