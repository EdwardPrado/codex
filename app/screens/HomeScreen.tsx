import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { spacing } from "../theme"
import { Button } from "tamagui"
import { useStores } from "app/models"
import { useAuth } from "app/services/auth/useAuth"
import { SignOutButton } from "app/components/SignOutButton"

export const HomeScreen: FC<TabScreenProps<"Home">> = observer(function CardSearchScreen(_props) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text>Hello World</Text>

      <Button onPress={handleLogout}>Logout</Button>
      <SignOutButton />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}
