/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet, HelmetProps } from 'react-helmet'

type Props = {
  lang?: string
  title?: string
  description?: string
  meta?: HelmetProps['meta']
}

const SEO: React.FC<Props> = ({
  description = ``,
  lang = 'en',
  title = ``,
  meta = [],
}) => {
  const { site } = useStaticQuery<GraphQLData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const des = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang: lang!,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: des,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: des,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: des,
        },
        ...meta,
      ]}
    />
  )
}

export default SEO
