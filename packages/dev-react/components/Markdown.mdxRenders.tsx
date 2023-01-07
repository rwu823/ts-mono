import type React from 'react'

import NextLink from 'next/link'

import type { MDXProvider } from '@mdx-js/react'

// import { MarkdownBlockquote } from './MarkdownBlockquote'
// import { MarkdownCode } from './MarkdownCode'
// import { MarkdownCodeBlock } from './MarkdownCodeBlock'
// import { MarkdownHead } from './MarkdownHead'
// import { MarkdownLink } from './MarkdownLink'

export const mdxRenders: React.ComponentProps<
  typeof MDXProvider
>['components'] = {
  // blockquote: (props) => <blockquote {...props} className="m-0" />,
}
