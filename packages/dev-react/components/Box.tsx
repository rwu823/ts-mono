import type { CSSProperties } from 'react'

import type { SerializedStyles } from '@emotion/react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

const BoxBase = styled('div')()

export type BoxProps = {
  debug?: boolean | string
  cx?: SerializedStyles
}

export const Box: React.FC<BoxProps & React.ComponentProps<typeof BoxBase>> = ({
  children,
  cx,
  debug,
  ...props
}) => {
  const theme = useTheme()
  const style: CSSProperties = debug
    ? {
        outline: `1px dashed ${theme.colors.gray['500']}`,
      }
    : {}

  return (
    <BoxBase style={style} {...props}>
      {children}
    </BoxBase>
  )
}

export const Flex = styled(Box)`
  display: flex;
`

export const FlexCol = styled(Flex)`
  flex-direction: column;
`

export const Grid = styled(Box)`
  display: grid;
`
