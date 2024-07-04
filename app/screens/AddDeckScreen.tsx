import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useState } from "react"
import { View, ViewStyle, TextInput, Alert, TextStyle, StyleSheet } from "react-native"
import { HealthTracker, Screen, StackNavbar, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { colors, spacing } from "../theme"
import { Input, XStack, Button } from "tamagui"
import { useForm, Controller } from "react-hook-form"
import { Dropdown } from "react-native-element-dropdown"
import { deckYupSchema, formatDropdownData } from "../../schemas"
import { yupResolver } from "@hookform/resolvers/yup"
import { CardEntry, GameplayFormat } from "models"

type NewDeck = {
  deckName: string
  gameplayFormat: GameplayFormat
  cards: CardEntry[]
}

export const AddDeckScreen: FC<TabScreenProps<"DeckList">> = observer(function AddDeckScreen(
  _props,
) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deckYupSchema),
  })

  const onSubmit = (data) => handleSave(data)

  const handleSave = () => {}

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <StackNavbar text="Add Deck" />

      <View style={$contentWrapper}>
        <View style={$inputItem}>
          <Text style={$fieldName}>Deck Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={`Budget Starvo`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="deckName"
          />
          {errors.deckName && <Text style={$errorText}>Deck name is required.</Text>}
        </View>

        <View style={$inputItem}>
          <Text style={$fieldName}>Format</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Dropdown
                style={dropdownStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={formatDropdownData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select format"
                searchPlaceholder="Search format"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            name="gameplayFormat"
          />
          {errors.gameplayFormat && <Text style={$errorText}>Format is required.</Text>}
        </View>

        <Button theme={"active"} style={$saveButton} onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const $contentWrapper: ViewStyle = {
  marginTop: spacing.xxxl,
  height: "100%",
}

const $fieldName: TextStyle = {}

const $errorText: TextStyle = {
  color: colors.error,
}

const $inputItem: ViewStyle = {
  marginBottom: spacing.xl,
  gap: spacing.sm,
}

const $saveButton: ViewStyle = {
  width: 100,
  marginLeft: "auto",
  marginTop: spacing.lg,
}

const dropdownStyles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 9,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    padding: spacing.sm,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
