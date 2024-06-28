import { useNavigation } from "@react-navigation/native"
import { ArrowLeft } from "@tamagui/lucide-icons"
import { goBack } from "app/navigators"
import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { spacing } from "../theme"
import { Text } from "./Text"

export function WelcomeHeader(props: { progress: number; isReversed?: boolean }) {
  const { progress, isReversed } = props

  const navigation = useNavigation()

  function goNext() {
    navigation.navigate("Demo")
  }

  return (
    <View style={$wrapper}>
      <TouchableOpacity style={$actionIconContainer} onPress={() => goBack()}>
        <ArrowLeft color={isReversed ? "#000" : "#fff"} />
      </TouchableOpacity>
      <View style={$progressMeter}>
        <View
          style={[
            $innerProgressMeter,
            { width: `${progress}%`, backgroundColor: isReversed ? "#000" : "#fff" },
          ]}
        />
      </View>
      <TouchableOpacity style={$actionIconContainer} onPress={() => goNext()}>
        <Text style={[$skipButton, { color: isReversed ? "#000" : "#fff" }]}>Skip</Text>
      </TouchableOpacity>
    </View>
  )
}

const $wrapper: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  height: 56,
  zIndex: 9999,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "transparent",
}

const $actionIconContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.md,
  zIndex: 2,
}

const $progressMeter: ViewStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  height: 4,
  borderRadius: 5,
  flexGrow: 1,
}

const $innerProgressMeter: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  height: 4,
}

const $skipButton: TextStyle = {
  fontWeight: 700,
}
