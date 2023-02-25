import 'highlight.js/styles/night-owl.css'

import { useEffect, useMemo, useRef, useState } from 'react'

import { css, Global } from '@emotion/react'

import hl from 'highlight.js/lib/common'

import { Box } from './Box'

export interface MarkdownCodeBlockProps {
  src: string
  language?: string
  isDark?: boolean
  hasCopy?: boolean
  file?: string
  line?: string
}

let renderedGlobalStyles = false

export const MarkdownCodeBlock = ({
  language = 'plaintext',
  file,
  src,
}: MarkdownCodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null)
  const code = useMemo(() => {
    try {
      return hl.highlight(src, { language }).value
    } catch {
      return src
    }
  }, [src, language])

  useEffect(() => {
    renderedGlobalStyles = true
  }, [])

  const [copy, setCopy] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setCopy(false)
    }, 1000)

    return () => clearTimeout(t)
  }, [copy])

  return (
    <div
      className={'hljs rounded'}
      css={css`
        position: relative;
        padding: 1em;

        &:hover {
          [data-id='copy'] {
            display: block;
          }
        }
      `}
    >
      {!renderedGlobalStyles && (
        <Global
          styles={css`
            @import url('https://cdn.jsdelivr.net/npm/victormono@latest/dist/index.min.css');
          `}
        />
      )}

      <Box
        css={css`
          position: absolute;
          top: 10px;
          right: 10px;
          display: none;
        `}
        data-id="copy"
      >
        {copy ? (
          <span className={`text-10px cursor-default text-gray-400`}>
            Copied
          </span>
        ) : (
          <i
            className={
              'bx:copy-alt cursor-pointer text-xl text-gray-400 hover:text-gray-300'
            }
            onClick={() => {
              setCopy(true)
            }}
          />
        )}
      </Box>

      <div
        css={css`
          font-family: 'Victor Mono', monospace;
        `}
      >
        {file && <div className="mb-3 text-xs text-gray-400">{file}</div>}
        <code
          className={`language-${language} text-sm`}
          dangerouslySetInnerHTML={{ __html: code }}
          ref={codeRef}
        />
      </div>
    </div>
  )

  // const Theme = useMemo(() => (theme === 'day' ? White : Dark), [theme])
  // const $parent = useRef(null)

  // const [isCopied, setCopied] = useState(false)

  // const onCopy = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
  //   copy(src)
  //   setCopied(true)

  //   setTimeout(() => {
  //     setCopied(false)
  //   }, 2000)
  // }, [src])

  // const isDay = theme === 'day'

  // const lines = useMemo(() => {
  //   if (meta?.line) {
  //     if (meta.line.includes(',')) {
  //       return meta.line.split(',').map((s) => Number.parseInt(s.trim(), 10))
  //     }

  //     if (meta.line.includes('-')) {
  //       const [start, end] = meta.line.split('-')

  //       return [
  //         +start,
  //         ...[Array.from({ length: +end - +start })].map(
  //           (_, i) => +start + i + 1,
  //         ),
  //       ]
  //     }

  //     return [+meta.line]
  //   }

  //   return []
  // }, [meta])

  // return (
  //   <Div
  //     {...props}
  //     className="mdx-code-block"
  //     isDay={isDay}
  //     onMouseEnter={() => setCopied(false)}
  //   >
  //     <Theme ref={$parent}>
  //       {(language || meta?.file) && (
  //         <ToolBar>
  //           {language && <Language type={language} />}
  //           {meta?.file && <Title>{meta?.file}</Title>}
  //         </ToolBar>
  //       )}

  //       <Source>
  //         {lines.map((line) => (
  //           <i
  //             key={line}
  //             data-line={line}
  //             style={{ top: (line - 1) * 19 + 14 }}
  //           />
  //         ))}
  //         <pre>
  //           <code
  //             dangerouslySetInnerHTML={{ __html: code.trim() }} // eslint-disable-line react/no-danger
  //           />
  //         </pre>
  //         {hasCopy && (
  //           <CopyRow onClick={onCopy}>
  //             <CopyIcon />
  //             {isCopied ? 'Copied' : 'Copy'}
  //           </CopyRow>
  //         )}
  //       </Source>
  //     </Theme>
  //   </Div>
}
