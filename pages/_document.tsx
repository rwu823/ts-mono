import React from 'react'

import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document<{ styleTags: React.ReactNode }> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()

    const pageProps = await ctx.renderPage(
      (App) => (props) =>
        sheet.collectStyles(
          <StyleSheetManager>
            <App {...props} />
          </StyleSheetManager>,
        ),
    )

    const styleTags = sheet.getStyleElement()

    return {
      ...pageProps,
      styleTags,
    }
  }

  render() {
    const { styleTags } = this.props

    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/victormono@latest/dist/index.min.css"
          />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
