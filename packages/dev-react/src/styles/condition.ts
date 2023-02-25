export const conditions = {
  conditions: {
    default: {},
    sm: { '@media': '(min-width: 640px)' },
    md: { '@media': '(min-width: 768px)' },
    lg: { '@media': '(min-width: 1024px)' },
    xl: { '@media': '(min-width: 1280px)' },
    xl2: { '@media': '(min-width: 1536px)' },

    hover: { selector: '&:hover' },
    focus: { selector: '&:focus' },
  },
  defaultCondition: 'default',
  responsiveArray: ['default', 'sm', 'lg'],
} as const
