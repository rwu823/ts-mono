import React from 'react'

import NextLink from 'next/link'

import { MarkdownBlockquote } from '@ts-mono/dev-react/components/MarkdownBlockquote'
import { MarkdownCode } from '@ts-mono/dev-react/components/MarkdownCode'
import { MarkdownCodeBlock } from '@ts-mono/dev-react/components/MarkdownCodeBlock'
import type { MarkdownCodeBlockMeta } from '@ts-mono/dev-react/components/MarkdownCodeBlock.createCode'
import { MarkdownHead } from '@ts-mono/dev-react/components/MarkdownHead'
import { MarkdownLink } from '@ts-mono/dev-react/components/MarkdownLink'

import type { MDXProvider } from '@mdx-js/react'

export const mdxRenders: Parameters<typeof MDXProvider>[0]['components'] = {
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

  code: ({ children, className = '' }) => {
    const language = className.split('-').slice(1).join('-') || ''

    const [type, meta] = language.split('|')

    let metaObj: MarkdownCodeBlockMeta | undefined

    if (meta) {
      try {
        metaObj = JSON.parse(meta)
      } catch (error) {
        console.warn(error)
        metaObj = {}
      }
    }

    return (
      <MarkdownCodeBlock
        language={type}
        meta={metaObj}
        src={children as string}
      />
    )
  },

  blockquote: MarkdownBlockquote,
}
