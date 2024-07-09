import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, StackNavbar, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { spacing } from "../theme"
import { navigate } from "app/navigators"

export const ViewDeckScreen: FC<TabScreenProps<"ViewDeck">> = observer(function CardSearchScreen(
  _props,
) {
  const { id, created_at, name, art_crops, formats } = _props?.route.params.deck

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <StackNavbar text="Add Deck" overrideBack={() => navigate("Decklist")} />
      <Text>View Deck Screen</Text>
      <Text>{name}</Text>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}
