import { createSprinkles } from '@vanilla-extract/sprinkles'

import { borderProperties } from './border.css'
import { colorProperties } from './color.css'
import { layoutProperties } from './layout.css'
export const s = createSprinkles(
  colorProperties,
  layoutProperties,
  borderProperties,
)

export type AtomicStyle = Parameters<typeof s>[0]
