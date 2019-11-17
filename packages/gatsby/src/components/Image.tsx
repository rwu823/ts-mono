import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

type Props = {
  is: string
}

const Image: React.FC<Props> = ({ is }) => {
  const { file } = useStaticQuery<GraphQLData>(
    graphql`
      query {
        file(relativePath: { eq: "gatsby-astronaut.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  )

  return <Img fluid={file.childImageSharp.fluid} />
}

export default Image
