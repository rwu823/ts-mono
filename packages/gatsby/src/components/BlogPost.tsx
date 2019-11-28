import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { mdxRenders } from '@ts-mono/dev-react/components/mdx-renders'
import Layout from './Layout'
const { MDXProvider } = require('@mdx-js/react')
type Props = {
  data: GraphQLData
}

const BlogPost: React.FC<Props> = ({ data: { mdx } }) => {
  return (
    <Layout>
      <header>{mdx.id}</header>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXProvider components={mdxRenders}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
