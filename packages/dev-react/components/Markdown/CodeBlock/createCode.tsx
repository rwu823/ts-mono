import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-bash'

import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Dark from './dark.theme'
import White from './white.theme'
import { CopyRow, CopyIcon } from './Copy'

import copy from '../../../share/copy'

const Title = styled.div`
  ${() => css`
    /* margin-right: auto; */
  `}
`

const ToolBar = styled.div`
  ${() => css`
    font: 0.6rem 'Menlo', monospace;
    color: #999;
    display: flex;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #eee;
    padding: 12px 20px;
    justify-content: space-between;

    sub {
      margin-left: auto;
    }
  `}
`

const Div = styled.div<{ isDay: boolean }>`
  ${p => css`
    background: ${p.isDay ? '#eee' : '#282c34'};
    position: relative;
    border-radius: 5px;
    overflow: hidden;

    ${CopyRow} {
      fill: ${p.isDay ? '#000' : '#fff'};
      color: ${p.isDay ? '#000' : '#fff'};
      background: ${p.isDay ? 'rgba(0,0,0,.1)' : 'rgba(255,255,255,.1)'};

      :hover {
        background: ${p.isDay ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.2)'};
      }
    }

    ${ToolBar} {
      border-color: ${p.isDay ? '#ddd' : '#555'};
    }

    :hover {
      ${CopyRow} {
        bottom: 0;
      }
    }
  `}
`

export interface CodeProps {
  language?: string | null
  theme?: 'day' | 'night'
  src: string
  name?: string
  hasCopy?: boolean
}

export const createCode = (defaultProps: Partial<CodeProps> = {}) => {
  const CodeBlock: React.FunctionComponent<CodeProps> = ({
    language,
    src,
    theme,
    hasCopy,
    name: title,
    ...props
  }) => {
    const code =
      language && Prism.languages[language]
        ? Prism.highlight(src, Prism.languages[language], language)
        : src

    const Theme = theme === 'day' ? White : Dark
    const $parent = React.useRef(null)

    const [isCopied, setCopied] = useState(false)

    const onCopy = () => {
      copy(src)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }

    const isDay = theme === 'day'

    return (
      <Div
        {...props}
        className="mdx-code-block"
        isDay={isDay}
        onMouseEnter={() => setCopied(false)}
      >
        <Theme ref={$parent}>
          <ToolBar>
            {title && <Title>{title}</Title>}
            <sub>{language}</sub>
          </ToolBar>
          <pre>
            <code
              dangerouslySetInnerHTML={{ __html: code.trim() }} // eslint-disable-line react/no-danger
            />
          </pre>
        </Theme>

        {hasCopy && (
          <CopyRow onClick={onCopy}>
            <CopyIcon /> {isCopied ? 'Copied' : 'Copy'}
          </CopyRow>
        )}
      </Div>
    )
  }

  CodeBlock.defaultProps = {
    language: 'jsx',
    theme: 'night',
    hasCopy: true,
    ...defaultProps,
  }

  return CodeBlock
}
