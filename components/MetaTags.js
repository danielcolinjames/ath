import Head from "next/head";

const MetaTags = ({
  title,
  description,
  openGraphImageAbsoluteUrl,
  url,
  pageTitle,
}) => {
  const metaTitle = title ? `${title} | ATH.ooo` : "ATH.ooo";
  // allow the option to set the <title> tag of a page separately from the one that shows up for its meta tags
  const titleTag = pageTitle ? pageTitle : metaTitle;
  const metaDescription = description
    ? description
    : "ATH.ooo is the fastest way to check the all-time high price of any crypto asset";
  const metaImage = openGraphImageAbsoluteUrl
    ? openGraphImageAbsoluteUrl
    : "https://og.ath.ooo/og.png";
  const metaUrl = url ? url : "https://ath.ooo/";

  return (
    <>
      <Head>
        {/* General Meta Tags */}
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="https://ath.ooo/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="apple-touch-icon"
          href="https://ath.ooo/logo192.png"
        />
        <link rel="manifest" href="https://ath.ooo/manifest.json" /> */}

        {/* Primary Meta Tags */}
        <title>{titleTag}</title>

        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />

        {/* Item Props */}
        <meta itemProp="name" content={metaTitle} />
        <meta itemProp="description" content={metaDescription} />
        <meta itemProp="image" content={metaDescription} />

        {/* Twitter */}
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image:src" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://ath.ooo" />

        {/* Open Graph / Facebook */}
        <meta name="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        <meta name="og:image" content={metaImage} />
        <meta name="og:url" content={metaUrl} />
        <meta name="og:site_name" content="ATH.ooo" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="website" />
      </Head>
    </>
  );
};

export default MetaTags;
