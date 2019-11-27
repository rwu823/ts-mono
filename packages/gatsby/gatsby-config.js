const path = require('path')
const { NODE_ENV } = process.env
const isDev = !NODE_ENV || NODE_ENV === 'development'

const pkg = require(path.resolve('package.json'))

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your CMS project`,
    author: `@rwu`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: isDev,
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        allowNamespaces: true,
      },
    },
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: pkg.name,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/icon.png`,
    //   },
    // },
  ],
}
