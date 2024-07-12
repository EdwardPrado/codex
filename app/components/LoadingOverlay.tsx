import React from "react"
import { View } from "react-native"
import { Spinner } from "tamagui"

export const LoadingOverlay = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spinner size="large" color="$gray1Dark" />
    </View>
  )
}
