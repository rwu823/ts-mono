import React from 'react'
export type DemoContainerChildProps = {}

export const DemoContainerChild: React.FC<
  DemoContainerChildProps & React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}
