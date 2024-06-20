import { Minus, Plus } from "@tamagui/lucide-icons"
import React, { useEffect, useState } from "react"
import { ViewStyle } from "react-native/types"
import { View } from "tamagui"
import { Text } from "./Text"
import { Button } from "./Button"

export function HealthTracker(props: {
  startingHp: number
  isFlipped?: boolean
  onSubtractPress: () => void
  onAdditionPress: () => void
}) {
  const [health, setHealth] = useState(props.startingHp)

  useEffect(() => {
    setHealth(props.startingHp)
  }, [props.startingHp])

  return (
    <View style={props.isFlipped ? $healthWrapperFlipped : $healthWrapper}>
      <Button
        preset="filled"
        onPress={props.onSubtractPress}
        style={$healthButton}
        pressedStyle={[{ backgroundColor: "transparent" }]}
      >
        <Minus size="$4" />
      </Button>
      <Button
        preset="filled"
        onPress={props.onAdditionPress}
        style={$healthButton}
        pressedStyle={[{ backgroundColor: "transparent" }]}
      >
        <Plus size="$4" />
      </Button>
      <Text
        testID="health"
        text={`${health}`}
        preset="heading"
        style={{
          fontSize: 68,
          lineHeight: 76,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          zIndex: -1,
          width: "100%",
          textAlign: "center",
        }}
      />
    </View>
  )
}

const $healthWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50%",
}

const $healthWrapperFlipped: ViewStyle = {
  ...$healthWrapper,
  transform: [{ scale: -1 }],
}

const $healthButton: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent",
  justifyContent: "center",
  height: "100%",
}
