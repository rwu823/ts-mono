import { defineProperties } from '@vanilla-extract/sprinkles'

import { conditions } from './condition'
import { themeVars } from './themes.css'
import { toRem } from './utils'

const border = {
  1: toRem(1),
  2: toRem(2),
  3: toRem(3),
  4: toRem(4),
  5: toRem(5),
  6: toRem(6),
  7: toRem(7),
  8: toRem(8),
  9: toRem(9),
  10: toRem(10),
}

export const borderProperties = defineProperties({
  ...conditions,
  properties: {
    border: {
      none: 'none',
    },

    borderTopWidth: border,
    borderRightWidth: border,
    borderBottomWidth: border,
    borderLeftWidth: border,

    borderTopColor: themeVars,
    borderRightColor: themeVars,
    borderBottomColor: themeVars,
    borderLeftColor: themeVars,

    borderTopStyle: ['solid', 'dashed', 'dotted'],
    borderRightStyle: ['solid', 'dashed', 'dotted'],
    borderBottomStyle: ['solid', 'dashed', 'dotted'],
    borderLeftStyle: ['solid', 'dashed', 'dotted'],

    borderTopLeftRadius: border,
    borderTopRightRadius: border,
    borderBottomLeftRadius: border,
    borderBottomRightRadius: border,
  },

  shorthands: {
    'bd-x-s': ['borderRightStyle', 'borderLeftStyle'],
    'bd-y-s': ['borderTopStyle', 'borderBottomStyle'],
    'bd-s': [
      'borderTopStyle',
      'borderBottomStyle',
      'borderRightStyle',
      'borderLeftStyle',
    ],
    bd: ['border'],
    radius: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],

    radiusTop: ['borderTopLeftRadius', 'borderTopRightRadius'],
    radiusBottom: ['borderBottomLeftRadius', 'borderBottomRightRadius'],

    'bd-x-w': ['borderLeftWidth', 'borderRightWidth'],
    'bd-y-w': ['borderTopWidth', 'borderBottomWidth'],
    'bd-w': [
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth',
    ],
  },
})
