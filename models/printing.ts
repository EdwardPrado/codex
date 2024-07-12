import { ReleaseEdition } from "./releaseEdition"
import { Foiling } from "./foiling"
import { Treatment } from "./treatment"

export interface Printing {
  artist: string
  edition?: ReleaseEdition
  foiling?: Foiling
  identifier: string
  image: string
  oppositeImage?: string
  print: string
  set: string
  tcgplayer?: {
    productId?: string
    url?: string
  }
  treatment?: Treatment
}
