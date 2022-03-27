import React from 'react'
export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'height'>

export const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return <svg {...props} ref={ref} />
})

Icon.displayName = 'Icon'
