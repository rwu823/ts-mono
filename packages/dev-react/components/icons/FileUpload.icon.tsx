import React from 'react'

import type { IconProps } from '@ts-mono/dev-react/components/Icon'
import { Icon } from '@ts-mono/dev-react/components/Icon'
export const FileUploadIcon = React.forwardRef(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return (
      <Icon viewBox="0 0 20 20" width={20} {...props} ref={ref}>
        <path d="M13.996 8.342a2 2 0 0 0 1.335 1.799A2.502 2.502 0 0 1 14.5 15H14a1 1 0 1 0 0 2h.5a4.502 4.502 0 0 0 1.495-8.746 5.484 5.484 0 0 0-1.69-3.726A5.5 5.5 0 0 0 5.02 8.025 4.5 4.5 0 0 0 5.5 17H6a1 1 0 1 0 0-2h-.5a2.5 2.5 0 0 1-.269-4.986 2 2 0 0 0 1.782-1.818 3.5 3.5 0 0 1 6.983.146Zm-4.703-.05a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L11 11.414V16a1 1 0 1 1-2 0v-4.586l-1.293 1.293a1 1 0 0 1-1.414-1.414l3-3Z" />
      </Icon>
    )
  },
)
FileUploadIcon.displayName = 'FileUploadIcon'
