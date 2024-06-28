import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text, WelcomeHeader } from "app/components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const searchBanner = require("../../assets/images/welcome03.jpg")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeSearchScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("WelcomeLogin")
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <WelcomeHeader progress={66} />
      <View style={$topContainer}>
        <Image style={$welcomeBanner} source={searchBanner} resizeMode="cover" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <View>
          <Text style={$stepIndicator}>2/3</Text>
          <Text preset="heading" style={$welcomeHeading}>
            Card Search
          </Text>
          <Text preset="subheading" style={$welcomeSubheading}>
            Discover cards from as far back as "Welcome to Rathe"
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
