import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-JRKNF4376S');`,
          }}
        ></script>
      </Head>
      <Component {...pageProps} />
      <style jsx global>{`
        ::-moz-selection {
          color: black;
          background: #00ffbf;
        }

        ::selection {
          color: black;
          background: #00ffbf;
        }
      `}</style>
    </>
  );
}

export default MyApp;
