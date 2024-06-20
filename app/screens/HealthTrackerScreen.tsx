import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { HealthTracker, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { colors, spacing } from "../theme"

import { Menu, X } from "@tamagui/lucide-icons"
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Label,
  Separator,
  Sheet,
  ToggleGroup,
  Unspaced,
  XStack,
  styled,
} from "tamagui"

const MenuButton = styled(Button, {
  backgroundColor: "transparent",
})

const DEFAULT_HP = 40

export const HealthTrackerScreen: FC<TabScreenProps<"HealthTracker">> = observer(
  function HealthTrackerScreen(_props) {
    const [playerCount, setPlayerCount] = useState<number>(1)
    const [formValues, setFormValues] = useState({
      playerCountInput: 1,
      hpCountInput: DEFAULT_HP,
    })

    const [playerOneHP, setPlayerOneHP] = useState(DEFAULT_HP)
    const [playerTwoHP, setPlayerTwoHP] = useState(DEFAULT_HP)

    const resetGame = () => {
      setPlayerOneHP(Number(formValues.hpCountInput))
      setPlayerTwoHP(Number(formValues.hpCountInput))
      setPlayerCount(Number(formValues.playerCountInput))
    }
    const updateHpCountInput = (newHpCountInput: number) => {
      const newFormValues = { ...formValues, hpCountInput: newHpCountInput }
      setFormValues(newFormValues)
    }
    const updatePlayerCountInput = (newPlayerCountInput: number) => {
      const newFormValues = { ...formValues, playerCountInput: newPlayerCountInput }
      setFormValues(newFormValues)
    }

    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <Dialog modal>
          <View style={$tabBar}>
            <Dialog.Trigger asChild>
              <MenuButton icon={<Menu size="$1" />}></MenuButton>
            </Dialog.Trigger>
          </View>

          <Adapt when="sm" platform="touch">
            <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
              <Sheet.Frame padding="$4" gap="$4">
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
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
              <Dialog.Title>Setup Game</Dialog.Title>
              <Fieldset gap="$4" horizontal>
                <XStack flexDirection="row" alignItems="center" justifyContent="center" space="$4">
                  <Label
                    paddingRight="$0"
                    justifyContent="flex-end"
                    size="$4"
                    width={160}
                    htmlFor="playerCountInput"
                  >
                    Player Count
                  </Label>

                  <ToggleGroup
                    orientation="horizontal"
                    id="playerCountInput"
                    type="single"
                    size="$4"
                    disableDeactivation={true}
                    defaultValue={formValues.playerCountInput.toString()}
                    onValueChange={(value) => updatePlayerCountInput(Number(value))}
                  >
                    <ToggleGroup.Item value="1" aria-label="1 player">
                      <Text>1</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="2" aria-label="2 players">
                      <Text>2</Text>
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </XStack>
              </Fieldset>

              <Fieldset gap="$4" horizontal>
                <XStack flexDirection="row" alignItems="center" justifyContent="center" space="$4">
                  <Label
                    paddingRight="$0"
                    justifyContent="flex-end"
                    size="$4"
                    width={160}
                    htmlFor="hpInput"
                  >
                    HP
                  </Label>

                  <ToggleGroup
                    orientation="horizontal"
                    id="hpInput"
                    type="single"
                    size="$4"
                    disableDeactivation={true}
                    defaultValue={formValues.hpCountInput.toString()}
                    onValueChange={(value) => updateHpCountInput(Number(value))}
                  >
                    <ToggleGroup.Item value="20" aria-label="20 starting health points">
                      <Text>20</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="40" aria-label="40 starting health points">
                      <Text>40</Text>
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </XStack>
              </Fieldset>

              <XStack alignSelf="flex-end" gap="$4">
                <Dialog.Close displayWhenAdapted asChild>
                  <Button theme="active" aria-label="Start game" onPress={resetGame}>
                    Start Game
                  </Button>
                </Dialog.Close>
              </XStack>

              <Unspaced>
                <Dialog.Close asChild>
                  <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>

        {playerCount == 1 ? (
          <HealthTracker
            startingHp={playerOneHP}
            onAdditionPress={() => setPlayerOneHP((prevHP) => prevHP + 1)}
            onSubtractPress={() => setPlayerOneHP((prevHP) => prevHP - 1)}
          />
        ) : (
          <>
            <HealthTracker
              startingHp={playerTwoHP}
              isFlipped
              onAdditionPress={() => setPlayerTwoHP((prevHP) => prevHP + 1)}
              onSubtractPress={() => setPlayerTwoHP((prevHP) => prevHP - 1)}
            />
            <Separator marginVertical={15} style={{ borderColor: colors.border }} />
            <HealthTracker
              startingHp={playerOneHP}
              onAdditionPress={() => setPlayerOneHP((prevHP) => prevHP + 1)}
              onSubtractPress={() => setPlayerOneHP((prevHP) => prevHP - 1)}
            />
          </>
        )}
      </Screen>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.transparent,
  borderBottomColor: colors.border,
  borderBottomWidth: 1,
  alignItems: "flex-end",
}
