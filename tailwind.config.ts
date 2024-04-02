import path from 'node:path'

import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin.js'

export default {
  corePlugins: {
    preflight: false,
  },
  prefix: 'appier-ds-',
  content: [path.resolve('src/**/*.tsx')],
  theme: {
    extend: {},
  },
  blocklist: [],
  plugins: [
    plugin(({ addUtilities, matchUtilities, theme, addVariant }) => {
      addVariant('input-number-spin', [
        '&::-webkit-outer-spin-button',
        '&::-webkit-inner-spin-button',
      ])

      addVariant('scrollbar', ['&::-webkit-scrollbar'])
      addVariant('scrollbar-track', ['&::-webkit-scrollbar-track'])
      addVariant('scrollbar-thumb', ['&::-webkit-scrollbar-thumb'])

      addVariant('not-last-child', '&:not(:last-child)')
      addVariant('child', '&>*')

      matchUtilities(
        {
          appearance: (value) => {
            switch (value) {
              case 'textfield': {
                return {
                  appearance: value,
                  '-moz-appearance': value,
                }
              }
            }

            return null
          },
        },
        {
          values: {
            textfield: 'textfield',
          },
        },
      )
    }),
  ],
} satisfies Config
