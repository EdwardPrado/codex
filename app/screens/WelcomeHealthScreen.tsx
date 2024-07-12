import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text, WelcomeHeader } from "app/components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const healthBanner = require("../../assets/images/welcome02.jpg")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeHealthScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("WelcomeSearch")
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <WelcomeHeader progress={33} />
      <View style={$topContainer}>
        <Image style={$welcomeBanner} source={healthBanner} resizeMode="cover" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <View>
          <Text style={$stepIndicator}>1/3</Text>
          <Text preset="heading" style={$welcomeHeading}>
            Health Tracker
          </Text>
          <Text preset="subheading" style={$welcomeSubheading}>
            Full support for up to 2 players with presets for Blitz and Constructed
          </Text>
        </View>

        <Button testID="next-screen-button" preset="reversed" onPress={goNext}>
          Next
        </Button>
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

const $welcomeSubheading: TextStyle = {
  marginTop: 0,
}

const $stepIndicator: TextStyle = {
  fontSize: 14,
}
