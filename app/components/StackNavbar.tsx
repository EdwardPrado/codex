import { ArrowLeft } from "@tamagui/lucide-icons"
import { goBack } from "app/navigators"
import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { spacing } from "../theme"
import { Text } from "./Text"

export function StackNavbar(props: {
  isReversed?: boolean
  text: string
  overrideBack?: () => void
}) {
  const { text, isReversed, overrideBack } = props

  return (
    <View style={$wrapper}>
      <View style={$innerWrapper}>
        <TouchableOpacity
          style={$actionIconContainer}
          onPress={() => (overrideBack ? overrideBack() : goBack())}
        >
          <ArrowLeft color={isReversed ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text preset="subheading">{text}</Text>
      </View>
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
}

const $innerWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  gap: spacing.sm,
  paddingHorizontal: spacing.sm,
}

const $actionIconContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.md,
  zIndex: 2,
}
