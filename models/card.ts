import { Class } from "./class"
import { GameplayFormat } from "./gameplayFormat"
import { Rarity } from "./rarity"
import { Printing } from "./printing"

export interface Card {
  artists: string[]
  cardIdentifier: string
  classes: Class[]
  defaultImage: string
  name: string
  printings: Printing[]
  rarities: Rarity[]
  rarity: Rarity
  setIdentifiers: string[]
  sets: string[]
  specialImage: string
  subtypes: string[]
  types: string[]
  typeText: string

  bannedFormats?: GameplayFormat[]
  cost?: number
  defense?: number
  functionalText?: string
  fusions?: []
  life?: number
  string?: string
  intellect?: number
  isCardBack?: boolean
  keywords?: []
  oppositeSideCardIdentifier?: string
  oppositeSideCardIdentifiers?: string[]
  pitch?: number
  power?: number
  restrictedFormats?: GameplayFormat[]
  specialCost?: string
  specialDefense?: string
  specialLife?: string
  specialPower?: string
  specializations?: string[]
  strings?: string[]
  young?: boolean
}

export interface DoubleSidedCard extends Card {
  oppositeSideCard?: Card
}

export interface CardEntry extends Card {
  amount: number
}
