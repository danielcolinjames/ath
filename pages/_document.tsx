import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://api.fontshare.com/css?f[]=satoshi@300,400,500,700,900,1&display=swap"
            rel="stylesheet"
          />
          {/* eslint-disable-next-line @next/next/next-script-for-ga */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JRKNF4376S" />

          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JRKNF4376S');
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

export default MyDocument
