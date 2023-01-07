declare namespace JSX {
  interface IntrinsicElements {
    ['appier-icon']: Omit<
      React.ComponentPropsWithoutRef<'svg'>,
      'is' | 'className'
    > & {
      class: string
      is: 'solid_locale' | 'solid_filter' | 'outline_grid'
    }
  }
}
