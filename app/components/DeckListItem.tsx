import { ChevronRight } from "@tamagui/lucide-icons"
import React, { ReactElement, useEffect } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
  ViewStyle,
  ImageStyle,
} from "react-native"
import { colors, spacing } from "../theme"
import { Text } from "./Text"

const placeholderImage = require("../../assets/images/defaultArtCrop.jpg")

export type DeckListItemProps = {
  deck: {
    id: string
    created_at: string
    name: string
    formats: {
      id: string
      abbreviation: string
    }
    art_crops: {
      id: string
      crop_url: string
    }
  }
  onPress: () => void
}

export function DeckListItem(props: DeckListItemProps) {
  const { id, created_at, name, art_crops, formats } = props.deck

  return (
    <View style={$containerStyle}>
      <TouchableOpacity style={$itemContainer} onPress={props.onPress}>
        <View style={$imageContainer}>
          {art_crops?.crop_url ? (
            <Image style={$imageStyle} source={{ uri: art_crops.crop_url }} />
          ) : (
            <Image style={$imageStyle} source={placeholderImage} />
          )}
        </View>
        <View style={$contentContainer}>
          <View style={$textContainer}>
            <Text>
              {formats.abbreviation}: {name}
            </Text>
          </View>
          <View style={$iconContainer}>
            <ChevronRight />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const $containerStyle: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.border,
  overflow: "hidden",
}

const $imageContainer: ViewStyle = {
  maxWidth: 140,
  maxHeight: 80,
  width: "100%",
  height: "100%",
}

const $imageStyle: ImageStyle = {
  width: "100%",
  height: undefined,
  aspectRatio: 1,
}

const $itemContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
}

const $contentContainer: ViewStyle = {
  flex: 1,
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  alignContent: "flex-end",
  margin: spacing.sm,
}

const $textContainer: ViewStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
}
