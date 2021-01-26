import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
