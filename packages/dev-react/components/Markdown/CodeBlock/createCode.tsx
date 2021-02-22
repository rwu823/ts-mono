// import 'prismjs/plugins/line-highlight/prism-line-highlight.min'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.min'

/* eslint-disable simple-import-sort/imports */
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'
import 'prismjs/components/prism-typescript.min'
import 'prismjs/components/prism-css.min'
import 'prismjs/components/prism-bash.min'
import 'prismjs/components/prism-diff.min'
/* eslint-enable simple-import-sort/imports */

import React, { useCallback, useMemo, useState } from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import copy from '../../../share/copy'
import { CopyIcon } from './Copy'
import Dark from './dark.theme'
import White from './white.theme'

const Title = styled.div`
  ${() => css`
    margin-left: auto;
    font-size: 0.6rem;
  `}
`

const languageTheme: { [key: string]: FlattenSimpleInterpolation } = {
  js: css`
    color: #000;
    background: #e9d458;
  `,
  get jsx() {
    return this.js
  },
  ts: css`
    color: #fff;
    background: #1279c4;
  `,
  get tsx() {
    return this.ts
  },
  css: css`
    color: #fff;
    background: #c56496;
  `,
  htm: css`
    color: #fff;
    background: #dc4c2f;
  `,
  get html() {
    return this.htm
  },
}

const CopyRow = styled.div`
  ${() => css`
    position: absolute;
    right: 10px;
    bottom: 5px;
    font-size: 0.6rem;
    cursor: pointer;
    opacity: 0.6;
    padding: 7px 4px;
    border-radius: 4px;
    background: transparent;
    transition: background 0.4s;
  `}
`

const Language = styled.sub<{ type: string }>`
  ${(p) => css`
    margin-right: auto;
    line-height: 1;
    padding: 4px;
    border-radius: 0 0 3px 3px;
    color: #222;
    background: #ccc;

    ${languageTheme[p.type]}

    ::after {
      content: '${p.type}';
    }
  `}
`

const ToolBar = styled.div`
  ${() => css`
    font: 0.8rem 'Menlo', monospace;
    color: #bbb;
    display: flex;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 12px 20px;
    justify-content: space-between;
  `}
`

const Div = styled.div<{ isDay: boolean }>`
  ${(p) => css`
    background: ${p.isDay ? '#eee' : '#282c34'};
    position: relative;
    border-radius: 5px;
    overflow: hidden;

    ${CopyRow} {
      fill: ${p.isDay ? '#000' : '#fff'};
      color: ${p.isDay ? '#000' : '#fff'};

      :hover {
        background: ${p.isDay ? '#fff' : '#000'};
      }
    }
  `}
`

export type Meta = Partial<{
  file: string
  line: string
}>

export interface CodeProps {
  language?: string
  theme?: 'day' | 'night'
  src: string
  meta?: Meta
  hasCopy?: boolean
}

const Source = styled.div`
  ${() => css`
    position: relative;
  `}
`

export const createCode = (defaultProps: Partial<CodeProps> = {}) => {
  const CodeBlock: React.FC<CodeProps> = ({
    language,
    src,
    theme,
    hasCopy,
    meta,
    ...props
  }) => {
    const code = useMemo(
      () =>
        language && Prism.languages[language]
          ? Prism.highlight(src, Prism.languages[language], language)
          : src,
      [language, src],
    )

    const Theme = useMemo(() => (theme === 'day' ? White : Dark), [theme])
    const $parent = React.useRef(null)

    const [isCopied, setCopied] = useState(false)

    const onCopy = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
      copy(src)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }, [src])

    const isDay = theme === 'day'

    const lines = React.useMemo(() => {
      if (meta?.line) {
        if (meta.line.includes(',')) {
          return meta.line.split(',').map((s) => parseInt(s.trim(), 10))
        }

        if (meta.line.includes('-')) {
          const [start, end] = meta.line.split('-')

          return [+start].concat(
            [...Array(+end - +start)].map((_, i) => +start + i + 1),
          )
        }

        return [+meta.line]
      }

      return []
    }, [meta])

    return (
      <Div
        {...props}
        className="mdx-code-block"
        isDay={isDay}
        onMouseEnter={() => setCopied(false)}
      >
        <Theme ref={$parent}>
          {(language || meta?.file) && (
            <ToolBar>
              {language && <Language type={language} />}
              {meta?.file && <Title>{meta?.file}</Title>}
            </ToolBar>
          )}

          <Source>
            {lines.map((line) => (
              <i
                style={{ top: (line - 1) * 19 + 14 }}
                key={line}
                data-line={line}
              />
            ))}
            <pre>
              <code
                dangerouslySetInnerHTML={{ __html: code.trim() }} // eslint-disable-line react/no-danger
              />
            </pre>
            {hasCopy && (
              <CopyRow onClick={onCopy}>
                <CopyIcon />
                {isCopied ? 'Copied' : 'Copy'}
              </CopyRow>
            )}
          </Source>
        </Theme>
      </Div>
    )
  }

  CodeBlock.defaultProps = {
    theme: 'night',
    hasCopy: true,
    ...defaultProps,
  }

  return CodeBlock
}
