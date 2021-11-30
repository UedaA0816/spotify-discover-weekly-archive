import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

interface Props {}
class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="google-site-verification" content="YWFDQtNh6i4Lflgr5AEr7pERn-Q6OoTHXzCWpYHnLkM" />
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