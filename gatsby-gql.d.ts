interface GraphQLData {
  file: {
    childImageSharp: {
      fluid: {
        aspectRatio: number
        base64: string
        sizes: string
        src: string
        srcSet: string
      }
    }
  }
  mdx: {
    id: string
    body: string
    frontmatter: {
      title: string
      tags: string[]
    }
  }

  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
    }
  }
}
