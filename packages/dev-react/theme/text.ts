const base = 16

export default {
  xs: `${12 / base}rem`,
  sm: `${14 / base}rem`,
  base: `${base / base}rem`,
  lg: `${18 / base}rem`,
  xl: `${20 / base}rem`,
  '2xl': `${24 / base}rem`,
  '3xl': `${30 / base}rem`,
} as const
