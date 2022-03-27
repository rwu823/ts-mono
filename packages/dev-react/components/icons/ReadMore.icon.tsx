import React from 'react'

import type { IconProps } from '@ts-mono/dev-react/components/Icon'
import { Icon } from '@ts-mono/dev-react/components/Icon'
export const FitScreenIcon = React.forwardRef(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return (
      <Icon fill="none" viewBox="0 0 20 20" width={20} {...props} ref={ref}>
        <path
          d="M3 15V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <path
          d="M6 10V7h3M11 13h3v-3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </Icon>
    )
  },
)
FitScreenIcon.displayName = 'FitScreenIcon'
