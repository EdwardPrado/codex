import { GameplayFormat } from "models"
import * as yup from "yup"

type dropdownValue = {
  label: string
  value: string | number
}

export const formatDropdownData: dropdownValue[] = [
  { label: GameplayFormat.cc, value: GameplayFormat.cc },
  { label: GameplayFormat.blitz, value: GameplayFormat.blitz },
  { label: GameplayFormat.ultimate_pit_fight, value: GameplayFormat.ultimate_pit_fight },
  { label: GameplayFormat.commoner, value: GameplayFormat.commoner },
  { label: GameplayFormat.shapeshifter, value: GameplayFormat.shapeshifter },
  { label: GameplayFormat.blitz_living_legend, value: GameplayFormat.blitz_living_legend },
  { label: GameplayFormat.cc_living_legend, value: GameplayFormat.cc_living_legend },
  { label: GameplayFormat.cube, value: GameplayFormat.cube },
]

export const deckYupSchema = yup.object({
  deckName: yup
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(40, "Name must be at most 40 characters long")
    .required("Name is required"),
  gameplayFormat: yup.mixed().oneOf(formatDropdownData).required("Format is required"),
})
