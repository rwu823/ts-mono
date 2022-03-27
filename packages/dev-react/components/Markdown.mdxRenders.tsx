import React from 'react'

import NextLink from 'next/link'

import { MarkdownBlockquote } from '@ts-mono/dev-react/components/MarkdownBlockquote'
import { MarkdownCode } from '@ts-mono/dev-react/components/MarkdownCode'
import { MarkdownCodeBlock } from '@ts-mono/dev-react/components/MarkdownCodeBlock'
import { MarkdownHead } from '@ts-mono/dev-react/components/MarkdownHead'
import { MarkdownLink } from '@ts-mono/dev-react/components/MarkdownLink'

import type { MDXProvider } from '@mdx-js/react'

export const mdxRenders: React.ComponentProps<
  typeof MDXProvider
>['components'] = {
  h1: ({ children }) => <MarkdownHead level={1} text={children as string} />,
  h2: ({ children }) => <MarkdownHead level={2} text={children as string} />,

  a: ({ href, children, ...props }) => {
    let title = children as string
    const isExternal = title.endsWith('!')

    if (isExternal) {
      title = title.replace(/!$/, '')
      return (
        <MarkdownLink {...props} external={isExternal} href={href}>
          {title}
        </MarkdownLink>
      )
    }

    return (
      <NextLink href={href ?? '.'}>
        <MarkdownLink {...props} href={href}>
          {title}
        </MarkdownLink>
      </NextLink>
    )
  },

  code: ({ children, className, ...props }) => {
    if (String(children).endsWith('\n')) {
      const [, language] = className?.split('-') ?? []

      return (
        <MarkdownCodeBlock
          {...props}
          language={language}
          src={children as string}
        />
      )
    }

    return <MarkdownCode>{children}</MarkdownCode>
  },

  blockquote: (props) => <MarkdownBlockquote {...props} />,
}
