import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>{`
        ::-moz-selection {
          color: black;
          background: #00ffba;
        }
        ::selection {
          color: black;
          background: #00ffba;
        }
      `}</style>
    </>
  );
}

export default MyApp;
