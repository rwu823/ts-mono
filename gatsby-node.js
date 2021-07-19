const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.

  if (node.internal.type === 'Mdx') {
    createNodeField({
      name: 'path',
      node,
      value: createFilePath({ node, getNode }),
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw new Error('🚨 ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges

  // you'll call `createPage` for each result
  posts.forEach(({ node }) => {
    createPage({
      path: path.join('/posts', node.fields.path),
      component: path.resolve('src/components/BlogPost.tsx'),
      context: { id: node.id },
    })
  })
}
