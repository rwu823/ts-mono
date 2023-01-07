import { createTheme, createThemeContract } from '@vanilla-extract/css'

import { colors } from './colors'

const BRAND = '#d33b27'

export const themeVars = createThemeContract({
  font: null,
  bg: null,
  brand: null,
  gray: null,
  button: null,
  transparent: null,
  currentColor: null,
  inherit: null,
})

export const lightTheme = createTheme(themeVars, {
  font: colors.gray800,
  bg: colors.gray300,
  gray: colors.gray500,
  brand: BRAND,
  button: colors.blue400,
  transparent: colors.transparent,
  currentColor: colors.current,
  inherit: colors.inherit,
})

export const darkTheme = createTheme(themeVars, {
  font: colors.gray300,
  bg: colors.gray800,
  gray: colors.gray500,
  brand: BRAND,
  button: colors.blue400,
  transparent: colors.transparent,
  currentColor: colors.current,
  inherit: colors.inherit,
})
