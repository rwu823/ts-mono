import React from 'react'
import { graphql } from 'gatsby'
import BlogPostTemplate from './BlogPostTemplate'
import Layout from './Layout'

const BlogPost: React.FC<{ data: GraphQLData }> = ({ data: { mdx } }) => (
  <Layout>
    <BlogPostTemplate
      title={mdx.frontmatter.title}
      tags={mdx.frontmatter.tags}
      body={mdx.body}
    />
  </Layout>
)

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
