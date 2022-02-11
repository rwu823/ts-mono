import React from 'react'

import { graphql } from 'gatsby'

import BlogPostTemplate from './BlogPostTemplate'
import Layout from './Layout'

const BlogPost: React.FC<{ data: GraphQLData }> = ({ data: { mdx } }) => (
  <Layout>
    <BlogPostTemplate
      body={mdx.body}
      tags={mdx.frontmatter.tags}
      title={mdx.frontmatter.title}
    />
  </Layout>
)

export default BlogPost

export const pageQuery = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
