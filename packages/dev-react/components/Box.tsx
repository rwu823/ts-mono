import React from 'react'

import type { AtomicStyle } from '~styles/style.css'
import { s as sprinkles } from '~styles/style.css'

import { htmlTags } from './Box.types'

type OmitProps<A extends object, B extends object> = Omit<
  A,
  'transition' | 'color' | 'ref' | keyof B
>

type JoinProps<A extends object, B extends object> = OmitProps<A, B> & B

type BoxProps = {
  children?: React.ReactNode
  className?: string
  ref?: React.Ref<unknown>
}

const propertiesSet: Set<string> = sprinkles.properties

export const createBox = (tag: keyof JSX.IntrinsicElements) => {
  const Box = React.forwardRef(
    ({ children, className, ...restProps }: BoxProps, ref) => {
      const sprinklesProps: Record<string, unknown> = {}
      const props: Record<string, unknown> = {}

      for (const [k, v] of Object.entries(restProps)) {
        if (propertiesSet.has(k)) {
          sprinklesProps[k] = v
        } else {
          props[k] = v
        }
      }

      return React.createElement(
        tag,
        {
          ...props,
          ref,
          className: [sprinkles(sprinklesProps), className]
            .filter(Boolean)
            .join(' ')
            .trim(),
        },
        children,
      )
    },
  )

  Box.displayName = `Box.${tag}`

  return Box
}

type BoxComponent = React.ForwardRefExoticComponent<
  JoinProps<React.ComponentPropsWithoutRef<'div'>, AtomicStyle & BoxProps>
> &
  Omit<
    {
      [tag in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
        JoinProps<React.ComponentPropsWithoutRef<tag>, AtomicStyle & BoxProps>
      >
    },
    'div'
  >

export const Box = createBox('div') as BoxComponent

for (const t of htmlTags) {
  Box[t] = createBox(t)
}
