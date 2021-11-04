import React from 'react'

import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'

class Document extends NextDocument {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const sheet = new ServerStyleSheet()
  //   const originalRenderPage = ctx.renderPage

  //   try {
  //     ctx.renderPage = () =>
  //       originalRenderPage({
  //         enhanceApp: (App) => (props) =>
  //           sheet.collectStyles(
  //             <StyleSheetManager>
  //               <App {...props} />
  //             </StyleSheetManager>,
  //           ),
  //       })

  //     const initialProps = await NextDocument.getInitialProps(ctx)

  //     return {
  //       ...initialProps,
  //       styles: (
  //         <>
  //           {initialProps.styles}
  //           {sheet.getStyleElement()}
  //         </>
  //       ),
  //     }
  //   } finally {
  //     sheet.seal()
  //   }
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/victormono@latest/dist/index.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
