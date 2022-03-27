import '@emotion/react'

import type theme from './theme/theme'

declare module '@emotion/react' {
  type ThemeType = typeof theme

  export interface Theme extends ThemeType, Theme {}
}
