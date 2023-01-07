import { defineProperties } from '@vanilla-extract/sprinkles'

import { conditions } from './condition'
import { toRem } from './utils'

const space = {
  auto: 'auto',
  0: 0,
  2: toRem(2),
  4: toRem(4),
  6: toRem(6),
  8: toRem(8),
  10: toRem(10),
  12: toRem(12),
  14: toRem(14),
  16: toRem(16),
  18: toRem(18),
  20: toRem(20),
}

const width = {
  0: 0,
  auto: 'auto',
  full: '100%',
  '1/2': `${100 / 2}%`,
  '1/3': `${100 / 3}%`,
  '1/4': `${100 / 4}%`,
  '1/5': `${100 / 5}%`,
  '1/6': `${100 / 6}%`,
}

export const layoutProperties = defineProperties({
  ...conditions,
  properties: {
    position: ['absolute', 'relative', 'fixed', 'static', 'sticky'],
    width,
    minWidth: width,

    height: {
      0: 0,
      auto: 'auto',
      full: '100vh',
    },
    minHeight: {
      0: 0,
    },

    display: {
      none: 'none',
      f: 'flex',
      b: 'block',
      g: 'grid',
      if: 'inline-flex',
      ib: 'inline-block',
      i: 'inline',
    },
    flexDirection: {
      row: 'row',
      col: 'column',
    },
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],

    flexWrap: ['nowrap', 'wrap'],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,

    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,

    cursor: ['pointer', 'default'],
  },
  shorthands: {
    d: ['display'],
    w: ['width'],
    minW: ['minWidth'],

    h: ['height'],

    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],

    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mb: ['marginBottom'],
    mt: ['marginTop'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],

    align: ['justifyContent', 'alignItems'],
  },
})
