import { defineProperties } from '@vanilla-extract/sprinkles'

import { themeVars } from './themes.css'

export const colorProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
  },
  defaultCondition: 'default',
  properties: {
    background: themeVars,
    color: themeVars,
  },

  shorthands: {
    bg: ['background'],
    clr: ['color'],
  },
})
