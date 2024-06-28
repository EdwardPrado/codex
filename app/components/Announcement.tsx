import { Info } from "@tamagui/lucide-icons"
import { colors } from "app/theme"
import { spacing } from "app/theme/spacing"
import React from "react"
import { View, ViewStyle, Text, TextStyle } from "react-native"

export const Announcement = (props: { message: String }) => {
  const { message } = props

  return (
    <View style={$announcementWrapper}>
      <Info color={colors.palette.neutral600} />
      <Text style={$announcementText}>{message}</Text>
    </View>
  )
}

const $announcementWrapper: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  marginVertical: spacing.md,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
}

const $announcementText: TextStyle = {
  width: "95%",
  color: colors.palette.neutral600,
}
