import type { PropsWithChildren } from 'react'
import React from 'react'

// import { BiLinkExternal } from 'react-icons/bi'
import styled from '@emotion/styled'

const A = styled.a`
  align-items: center;
  background-color: rgb(187 239 253 / 30%);
  border-bottom: 1px solid rgb(0 0 0 / 20%);
  color: #1a1a1a;
  column-gap: 4px;
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  text-decoration: none;

  :hover {
    background-color: #bbeffd;
    border-bottom-color: #1a1a1a;
    text-decoration: none;
  }
`

type Props = {
  href?: string
  external?: boolean
}

export const MarkdownLink = React.forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<Props>
>(({ children, external, ...props }, ref) => {
  if (external)
    return (
      <A {...props} ref={ref} target="_new">
        {children}
        <i className="bx:link-external" />
      </A>
    )

  return (
    <A {...props} ref={ref}>
      {children}
    </A>
  )
})

MarkdownLink.displayName = 'MarkdownLink'
