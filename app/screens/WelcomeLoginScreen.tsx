import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text, WelcomeHeader } from "app/components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { LoginMode } from "./LoginScreen"

const landingBanner = require("../../assets/images/welcome04.jpg")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeLoginScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <WelcomeHeader progress={100} />
      <View style={$topContainer}>
        <Image style={$welcomeBanner} source={landingBanner} resizeMode="cover" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <View>
          <Text style={$stepIndicator}>3/3</Text>
          <Text preset="heading" style={$welcomeHeading}>
            Start playing
          </Text>
        </View>

        <View style={$buttonContainer}>
          <Button
            preset="reversed"
            onPress={() => navigation.navigate("Login", { mode: LoginMode.login })}
            style={$primaryButton}
          >
            Login
          </Button>
          <Button
            preset="reversed"
            onPress={() => navigation.navigate("Login", { mode: LoginMode.register })}
            style={$primaryButton}
          >
            Register
          </Button>
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  maxHeight: "60%",
}

const $bottomContainer: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "43%",
  flexShrink: 1,
  flexGrow: 0,
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}

const $welcomeBanner: ImageStyle = {
  height: "100%",
  width: "100%",
}

const $welcomeHeading: TextStyle = {
  marginBottom: 0,
}

const $stepIndicator: TextStyle = {
  fontSize: 14,
}

const $buttonContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 16,
  rowGap: 20,
}

const $primaryButton: ViewStyle = {
  width: "47%",
}
