import 'highlight.js/styles/night-owl.css'

import { useEffect, useMemo, useRef, useState } from 'react'
import { BiCopyAlt } from 'react-icons/bi'

import { css, Global, useTheme } from '@emotion/react'
import { Box } from '@ts-mono/dev-react/components/Box'

import hl from 'highlight.js/lib/common'

export interface MarkdownCodeBlockProps {
  src: string
  language?: string
  isDark?: boolean
  hasCopy?: boolean
  file?: string
  line?: string
}

let renderedGlobalStyles = false

export const MarkdownCodeBlock: React.FC<MarkdownCodeBlockProps> = ({
  language = 'plaintext',
  file,
  src,
}) => {
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

  const theme = useTheme()

  const [copy, setCopy] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setCopy(false)
    }, 1000)

    return () => clearTimeout(t)
  }, [copy])

  return (
    <div
      className={'hljs'}
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
          <span
            css={css`
              color: ${theme.colors.gray[400]};
              font-size: 10px;
            `}
          >
            Copied
          </span>
        ) : (
          <BiCopyAlt
            css={css`
              color: ${theme.colors.gray[400]};

              :hover {
                color: ${theme.colors.gray[300]};
                cursor: pointer;
              }
            `}
            size={20}
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
        {file && (
          <div
            css={css`
              color: ${theme.colors.gray[400]};
              font-size: 12px;
              margin-bottom: ${theme.spacing[2]};
            `}
          >
            {file}
          </div>
        )}
        <code
          className={`language-${language}`}
          css={css`
            font-size: 14px;
          `}
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
