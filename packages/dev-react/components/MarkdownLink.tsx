import React from 'react'

import styled from 'styled-components'

const ExternalIcon: React.FC = (props) => (
  <svg
    fill="currentColor"
    height="1em"
    overflow="hidden"
    style={{
      width: '1em',
      height: '1em',
      verticalAlign: -3,
      marginLeft: 5,
    }}
    viewBox="0 0 1024 1024"
    width="1em"
    {...props}
  >
    <path d="M750.555 735.645c0 74.083-60.104 134.188-134.188 134.188h-387.65c-74.083 0-134.188-60.104-134.188-134.188v-387.65c0-74.083 60.104-134.188 134.188-134.188h328.012c8.387 0 14.91 6.523 14.91 14.91v29.819c0 8.387-6.523 14.909-14.91 14.909H228.717c-41.002 0-74.549 33.547-74.549 74.549v387.65c0 41.002 33.547 74.549 74.549 74.549h387.65c41.002 0 74.549-33.547 74.549-74.549V586.549c0-8.387 6.523-14.91 14.91-14.91h29.818c8.387 0 14.91 6.523 14.91 14.91v149.096zm178.916-313.103c0 16.308-13.512 29.819-29.819 29.819-7.921 0-15.376-3.262-20.967-8.853l-82.003-82.003L492.897 665.29c-2.796 2.796-6.989 4.659-10.717 4.659s-7.921-1.863-10.716-4.659l-53.116-53.116c-2.795-2.795-4.659-6.988-4.659-10.716s1.864-7.921 4.659-10.716l303.784-303.785-82.003-82.003c-5.591-5.591-8.853-13.046-8.853-20.967 0-16.308 13.512-29.819 29.819-29.819H899.65c16.308 0 29.819 13.512 29.819 29.819v238.555z" />
  </svg>
)

const A = styled.a`
  background-color: rgb(187 239 253 / 30%);
  border-bottom: 1px solid rgb(0 0 0 / 20%);
  color: #1a1a1a;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;

  :hover {
    background-color: #bbeffd;
    border-bottom-color: #1a1a1a;
    text-decoration: none;
  }
`

type Props = {
  href: string
  external?: boolean
}

export const MarkdownLink: React.FC<Props> = React.forwardRef<
  HTMLAnchorElement,
  Props
>(({ children, external = false, ...props }, ref) => {
  if (external)
    return (
      <A ref={ref} {...props} target="_new">
        {children}
        <ExternalIcon />
      </A>
    )

  return (
    <A ref={ref} {...props}>
      {children}
    </A>
  )
})
