export const CARDS_TABLE = "cards"
export const CARD_PRINTINGS_TABLE = "card_printings"
export const DECKS_TABLE = "decks"
export const DECK_LIST_TABLE = "deck_list"
export const FORMATS_TABLE = "formats"

export type CardRecord = {
  unique_id: string
  name: string
  pitch: string
  cost: string
  power: string
  defense: string
  health: string
  intelligence: string
  types: string[]
  card_keywords: string[]
  abilities_and_effects: string[]
  ability_and_effect_keywords: string[]
  granted_keywords: string[]
  removed_keywords: string[]
  interacts_with_keywords: string[]
  functional_text: string
  functional_text_plain: string
  type_text: string
  played_horizontally: boolean
  blitz_legal: boolean
  cc_legal: boolean
  commoner_legal: boolean
  blitz_living_legend: boolean
  blitz_living_legend_start?: string | null
  cc_living_legend: boolean
  cc_living_legend_start?: string | null
  blitz_banned: boolean
  blitz_banned_start?: string | null
  cc_banned: boolean
  cc_banned_start?: string | null
  upf_banned: boolean
  upf_banned_start?: string | null
  commoner_banned: boolean
  commoner_banned_start?: string | null
  blitz_suspended: boolean
  blitz_suspended_start?: string | null
  blitz_suspended_end?: string | null
  cc_suspended: boolean
  cc_suspended_start?: string | null
  cc_suspended_end?: string | null
  commoner_suspended: boolean
  commoner_suspended_start?: string | null
  commoner_suspended_end?: string | null
  ll_restricted: boolean
  ll_restricted_start?: string | null
}
export type CardPrintingRecord = {
  unique_id: string
  card_unique_id: string
  set_printing_unique_id: string
  card_id: string
  set_id: string
  edition: string
  foiling: string
  rarity: string
  artist: string
  art_variation: string
  flavor_text: string
  flavor_text_plain: string
  image_url: string
  tcgplayer_product_id: string
  tcgplayer_url: string
}
export type DeckRecord = {
  id: string
  created_at: string // ISO date string
  name: string
  user_fk: string
  format_fk: number
}
export type DeckListRecord = {
  id: string
  amount: number
  deck_fk: string
  card_fk: string
}
export type FormatRecord = {
  id: number
  name: string
  is_official: boolean
}
