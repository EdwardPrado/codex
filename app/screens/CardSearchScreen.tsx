import { observer } from "mobx-react-lite"
import React, { FC, useMemo, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { CardListItem, Icon, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { colors, spacing } from "../theme"
import { Card, cards } from "fab-cards"

import { XStack, Input } from "tamagui"

let typingTimer: ReturnType<typeof setTimeout>

export const CardSearchScreen: FC<TabScreenProps<"Search">> = observer(function CardSearchScreen(
  _props,
) {
  const [searchQuery, setSearchQuery] = useState("")

  const searchQueryRegex: RegExp = useMemo(() => {
    return new RegExp(searchQuery, "i")
  }, [searchQuery])

  const results = useMemo<Card[]>(() => {
    return searchQuery ? cards.filter((word) => word.name.match(searchQueryRegex)) : []
  }, [searchQueryRegex])

  const handleSearchQuery = (searchQuery: string) => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
      setSearchQuery(searchQuery)
    }, 1000)
  }

  const cardColor = (cardIdentifier: string) => {
    const value = cardIdentifier.match(/[^-]+$/)

    let hex = ""

    switch (value?.toString()) {
      case "yellow":
        hex = "#ffef00"
        break
      case "blue":
        hex = "#0091d8"
        break
      case "red":
        hex = "#c70e09"
        break
    }

    return hex
  }

  const pitchIcon = (pitchNumber: number) => {
    switch (pitchNumber) {
      case 1:
        return <Icon size={24} icon={"pitch1"} />
      case 2:
        return <Icon size={24} icon={"pitch2"} />
      case 3:
        return <Icon size={24} icon={"pitch3"} />
      default:
        return null
    }
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <XStack alignItems="center" space="$2">
        <Input
          flex={1}
          size={"$4"}
          placeholder="Search card name"
          onChangeText={(value) => handleSearchQuery(value)}
        />
      </XStack>
      <View>
        {searchQuery && (
          <>
            <Text style={$searchSummary}>
              <Text style={$searchSummaryBold}>{results.length} cards</Text> matching
              {' "' + searchQuery + '" '}
              were found.
            </Text>

            <ScrollView>
              {results.map((card) => (
                <CardListItem
                  topSeparator
                  key={card.cardIdentifier}
                  RightComponent={
                    <View
                      style={{
                        flexGrow: 0,
                        flexBasis: 120,
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        overflow: "hidden",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {card.cost !== undefined ? (
                        <>
                          {card.pitch && pitchIcon(card.pitch)}

                          {cardColor(card.cardIdentifier) && (
                            <Icon
                              size={24}
                              icon={"cost"}
                              color={cardColor(card.cardIdentifier)?.toString()}
                              style={{
                                borderWidth: 1,
                                borderColor: colors.palette.secondary100,
                                borderRadius: 100,
                              }}
                            />
                          )}
                          <View
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <Text>{card.cost} </Text>

                            <Icon size={24} icon={"cost"} />
                          </View>
                        </>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                  }
                >
                  <View>
                    <Text style={$cardMaintext}>{card.name}</Text>
                    <Text style={$cardSubtext}>{card.typeText}</Text>
                  </View>
                </CardListItem>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const $searchSummary: TextStyle = {
  paddingVertical: spacing.md,
  fontSize: 16,
}

const $searchSummaryBold = {
  fontWeight: "700",
  fontSize: 16,
}

const $cardSubtext: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
}

const $cardMaintext: TextStyle = {
  fontSize: 14,
}
