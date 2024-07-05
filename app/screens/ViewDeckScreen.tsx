import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, StackNavbar, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { spacing } from "../theme"
import { navigate } from "app/navigators"

export const ViewDeckScreen: FC<TabScreenProps<"Home">> = observer(function CardSearchScreen(
  _props,
) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <StackNavbar text="Add Deck" overrideBack={() => navigate("Decklist")} />
      <Text>View Deck Screen</Text>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}
