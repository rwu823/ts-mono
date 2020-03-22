import React from 'react'
import styled, { css } from 'styled-components'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import CodeBlock, { createCode } from './CodeBlock'
import { Code } from './Code'
import { H } from './H'
import { Link } from './A'
import { Blockquote } from './Blockquote'

export { createCode, CodeBlock }

export * from './Code'
export * from './H'
export * from './A'
export * from './Blockquote'

const renderers: ReactMarkdownProps['renderers'] = {
  link: ({ href, ...props }) => {
    const isExternal = /!$/.test(href)

    if (isExternal) href = href.replace(/!$/, '')

    return <Link {...props} href={href} external={isExternal} />
  },
  heading: ({ level, children }) => {
    const text = (children as any[]).reduce(
      (s, child) => s + child.props.children,
      '',
    )

    return <H level={level} text={text} />
  },
  inlineCode: (props) => <Code {...props} />,
  get emphasis() {
    return this.inlineCode
  },

  code: ({ language, value }) => {
    return <CodeBlock src={value} language={language} />
  },

  blockquote: (props) => <Blockquote {...props} />,
}

export const Markdown: React.FunctionComponent<{
  md: string
}> = ({ md }) => (
  <ReactMarkdown source={md} renderers={renderers} escapeHtml={false} />
)
