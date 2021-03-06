import React from 'react'

import { mdxRenders } from '@ts-mono/dev-react/components/Markdown.mdxRenders'

import { MDXRenderer } from 'gatsby-plugin-mdx'

const { MDXProvider } = require('@mdx-js/react')

type Props = {
  title: string
  body: string
  tags?: string[]
}

const BlogPostTemplate: React.FC<Props> = ({ title, body, tags }) => (
  <>
    <h1>{title}</h1>
    <ul>
      {tags?.map((tag) => (
        <li>{tag}</li>
      ))}
    </ul>
    <MDXProvider components={mdxRenders}>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  </>
)

export default BlogPostTemplate
