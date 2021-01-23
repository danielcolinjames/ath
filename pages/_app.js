import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-JRKNF4376S');`,
        }}
      ></script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
