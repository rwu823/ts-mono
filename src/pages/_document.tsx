import type { DocumentContext } from 'next/document'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import type { NormalizedCacheObject } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'

import { apolloClient } from '~apollo/client'

class Document extends NextDocument<{ apolloState: NormalizedCacheObject }> {
  static async getInitialProps(ctx: DocumentContext) {
    await getDataFromTree(<ctx.AppTree pageProps={{}} />)
    const initialProps = await NextDocument.getInitialProps(ctx)

    return { ...initialProps, apolloState: apolloClient.extract() }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
    window.__APOLLO_STATE__ = ${JSON.stringify(this.props.apolloState)};
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
