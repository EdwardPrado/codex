import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const landingBanner = require("../../assets/images/welcome01.jpg")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("WelcomeHealth")
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeBanner} source={landingBanner} resizeMode="cover" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <View>
          <Text preset="heading" style={$welcomeHeading}>
            Supporting your games
          </Text>
          <Text preset="subheading" style={$welcomeSubheading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt semper elit,
            in venenatis mauris ornare quis
          </Text>
        </View>

        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.getStarted"
          onPress={goNext}
        />
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
