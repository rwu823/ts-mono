import Prism from 'prismjs'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'
import 'prismjs/components/prism-typescript.min'
import 'prismjs/components/prism-css.min'
import 'prismjs/components/prism-bash.min'
import 'prismjs/components/prism-diff.min'

// import 'prismjs/plugins/line-highlight/prism-line-highlight.min'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.min'
import React, { useCallback, useMemo, useState } from 'react'

import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import copy from '../share/copy'
import { CopyIcon } from './MarkdownCodeBlockCopy'
import Dark from './MarkdownCodeBlockDarkTheme'
import White from './MarkdownCodeBlockWhiteTheme'

const Title = styled.div`
  ${() => css`
    font-size: 0.6rem;
    margin-left: auto;
  `}
`

const languageTheme: { [key: string]: FlattenSimpleInterpolation } = {
  js: css`
    background: #e9d458;
    color: #000;
  `,
  get jsx() {
    return this.js
  },
  ts: css`
    background: #1279c4;
    color: #fff;
  `,
  get tsx() {
    return this.ts
  },
  css: css`
    background: #c56496;
    color: #fff;
  `,
  htm: css`
    background: #dc4c2f;
    color: #fff;
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
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.6rem;
    opacity: 0.6;
    padding: 7px 4px;
    transition: background 0.4s;
  `}
`

const Language = styled.sub<{ type: string }>`
  ${(p) => css`
    background: #ccc;
    border-radius: 0 0 3px 3px;
    color: #222;
    line-height: 1;
    margin-right: auto;
    padding: 4px;

    ${languageTheme[p.type]}
    ::after {
      content: '${p.type}';
    }
  `}
`

const ToolBar = styled.div`
  ${() => css`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #bbb;
    display: flex;
    font: 0.8rem Menlo, monospace;
    justify-content: space-between;
    padding: 12px 20px;
  `}
`

const Div = styled.div<{ isDay: boolean }>`
  ${(p) => css`
    position: relative;
    background: ${p.isDay ? '#eee' : '#282c34'};
    border-radius: 5px;
    overflow: hidden;

    ${CopyRow} {
      color: ${p.isDay ? '#000' : '#fff'};
      fill: ${p.isDay ? '#000' : '#fff'};

      :hover {
        background: ${p.isDay ? '#fff' : '#000'};
      }
    }
  `}
`

export type MarkdownCodeBlockMeta = Partial<{
  file: string
  line: string
}>

export interface MarkdownCodeBlockProps {
  language?: string
  theme?: 'day' | 'night'
  src: string
  meta?: MarkdownCodeBlockMeta
  hasCopy?: boolean
}

const Source = styled.div`
  ${() => css`
    position: relative;
  `}
`

export const markdownCreateCode = (
  defaultProps: Partial<MarkdownCodeBlockProps> = {},
) => {
  const CodeBlock: React.FC<MarkdownCodeBlockProps> = ({
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
          return meta.line.split(',').map((s) => Number.parseInt(s.trim(), 10))
        }

        if (meta.line.includes('-')) {
          const [start, end] = meta.line.split('-')

          return [
            +start,
            ...[Array.from({ length: +end - +start })].map(
              (_, i) => +start + i + 1,
            ),
          ]
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
                key={line}
                data-line={line}
                style={{ top: (line - 1) * 19 + 14 }}
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
