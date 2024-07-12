import React, { useState } from "react"
import { ChevronRight, X } from "@tamagui/lucide-icons"
import { TextStyle, View, ViewStyle } from "react-native"
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, Unspaced, XStack } from "tamagui"
import { useForm, Controller } from "react-hook-form"
import { ListItem } from "./ListItem"
import { Text } from "../components"
import { colors, spacing } from "app/theme"
import { useAuth } from "app/services/auth/useAuth"
import { supabase } from "app/services/auth/supabase"
import { yupResolver } from "@hookform/resolvers/yup"
import { renameDeckYupSchema } from "schemas/renameDeckYupSchema"

const SAVE_ERROR_MESSAGE = "Unable to save name"

export function EditNameDialog(props: { name: string; id: string }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(renameDeckYupSchema),
  })

  const { name, id } = props
  const { user } = useAuth()
  const [saveError, setSaveError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = async (formData: { deckName: string }): Promise<any> => {
    const { data, error } = await supabase
      .from("decks")
      .update({ name: formData.deckName })
      .eq("id", id)
      .eq("user_id", user?.id)

    if (error) {
      setSaveError(true)
    } else {
      setIsModalOpen(false)
    }
  }

  const handleModalClick = () => {
    setIsModalOpen((prevVal) => !prevVal)
  }

  return (
    <Dialog modal open={isModalOpen}>
      <Dialog.Trigger asChild>
        <ListItem
          LeftComponent={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={$itemLabelContainer}>
                <Text preset="bold">Name</Text>
              </View>
              <View style={$itemNameContainer}>
                <Text style={$itemName}>{name}</Text>
              </View>
              <View style={$iconContainer}>
                <ChevronRight />
              </View>
            </View>
          }
          onPress={handleModalClick}
        />
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          animation="medium"
          zIndex={200000}
          modal
          dismissOnSnapToBottom
          onOpenChange={handleModalClick}
          snapPoints={[40, 50, 25]}
        >
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Edit name</Dialog.Title>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  flex={1}
                  id="name"
                  defaultValue={name}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="deckName"
            />
          </Fieldset>
          {errors.deckName && <Text style={$errorText}>{errors.deckName.message}</Text>}
          {saveError && <Text style={$errorText}>{SAVE_ERROR_MESSAGE}</Text>}

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close" onPress={handleSubmit(onSubmit)}>
                Save
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={<X />}
                //TODO:  Fix close icon not appearing
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
}

const $itemLabelContainer: TextStyle = {
  justifyContent: "center",
}

const $itemNameContainer: ViewStyle = {
  flex: 1,
  margin: spacing.sm,
}

const $itemName: TextStyle = {
  textAlign: "right",
}

const $errorText: TextStyle = {
  color: colors.error,
}
