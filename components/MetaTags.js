import Head from "next/head";
import useSystemTheme from "react-use-system-theme";

const MetaTags = ({
  title,
  description,
  openGraphImageAbsoluteUrl,
  url,
  pageTitle,
  noIndex,
  rgb,
}) => {
  const metaTitle = title ? title : "ATH.ooo";
  // allow the option to set the <title> tag of a page separately from the one that shows up for its meta tags
  const titleTag = pageTitle ? pageTitle : metaTitle;
  const metaDescription = description
    ? description
    : "ATH.ooo is the fastest way to check the all-time high price of any crypto asset";
  const metaImage = openGraphImageAbsoluteUrl
    ? openGraphImageAbsoluteUrl
    : "https://og.ath.ooo/og.png";
  const metaUrl = url ? url : "https://ath.ooo/";
  let r, g, b;

  if (rgb) [r, g, b] = rgb;
  const systemTheme = useSystemTheme();

  return (
    <>
      <Head>
        {/* General Meta Tags */}
        <meta charSet="utf-8" />

        {rgb ? (
          <>
            <link
              rel="icon"
              sizes="any"
              href={`data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%202778%202778%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xml%3Aspace%3D%22preserve%22%20xmlns%3Aserif%3D%22http%3A%2F%2Fwww.serif.com%2F%22%20style%3D%22fill-rule%3Aevenodd%3Bclip-rule%3Aevenodd%3Bstroke-linejoin%3Around%3Bstroke-miterlimit%3A2%3B%22%3E%3Cg%20transform%3D%22matrix(2.77778%2C0%2C0%2C2.77778%2C0%2C-52918.5)%22%3E%3Cg%20id%3D%22ath%22%20transform%3D%22matrix(0.260417%2C0%2C0%2C0.462963%2C0%2C19050.6)%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%223840%22%20height%3D%222160%22%20style%3D%22fill%3Anone%3B%22%2F%3E%3Cg%20id%3D%22Logomark%22%20transform%3D%22matrix(2.92328%2C0%2C0%2C2.92328%2C-3684.32%2C-2949.28)%22%3E%3Cg%20transform%3D%22matrix(1.18054e-16%2C-1.08448%2C2.05793%2C7.08818e-17%2C226.624%2C4299.46)%22%3E%3Crect%20x%3D%222353.03%22%20y%3D%221012.95%22%20width%3D%22544.81%22%20height%3D%22127.661%22%20style%3D%22fill%3A${
                systemTheme !== "dark" ? "rgb(0,0,0)" : "rgb(255,255,255)"
              }%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(8.78563e-17%2C-0.807076%2C2.05793%2C7.08818e-17%2C-298.812%2C3646.72)%22%3E%3Crect%20x%3D%222353.03%22%20y%3D%221012.95%22%20width%3D%22544.81%22%20height%3D%22127.661%22%20style%3D%22fill%3A${
                systemTheme !== "dark" ? "rgb(0,0,0)" : "rgb(255,255,255)"
              }%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(5.75469e-17%2C-0.528644%2C2.05793%2C7.08818e-17%2C-824.249%2C2991.56)%22%3E%3Crect%20x%3D%222353.03%22%20y%3D%221012.95%22%20width%3D%22544.81%22%20height%3D%22127.661%22%20style%3D%22fill%3A${
                systemTheme !== "dark" ? "rgb(0,0,0)" : "rgb(255,255,255)"
              }%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(-2.4111%2C-1.66092e-16%2C2.52024e-16%2C-1.15759%2C8247.31%2C2329.39)%22%3E%3Crect%20x%3D%222353.03%22%20y%3D%221012.95%22%20width%3D%22544.81%22%20height%3D%22127.661%22%20style%3D%22fill%3Argb(${r},${g},${b})%3B%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`}
            />
            {systemTheme !== "dark" ? (
              <>
                <link
                  rel="alternate icon"
                  href="/logo/2/favicon_backup_black.ico"
                />
                <link
                  rel="mask-icon"
                  color={`rgb(${r},${g},${b})`}
                  href="/logo/2/favicon.svg"
                />
              </>
            ) : (
              <>
                <link
                  rel="alternate icon"
                  href="/logo/2/favicon_backup_white.ico"
                />
                <link
                  rel="mask-icon"
                  color={`rgb(${r},${g},${b})`}
                  href="/logo/2/favicon-white.svg"
                />
              </>
            )}
          </>
        ) : systemTheme !== "dark" ? (
          <>
            <link rel="icon" href="/logo/2/favicon.svg" />
            <link
              rel="alternate icon"
              href="/logo/2/favicon_backup_black.ico"
            />
            <link
              rel="mask-icon"
              color="#000000"
              href="/logo/2/favicon_backup_black.ico"
            />
          </>
        ) : (
          <>
            <link rel="icon" href="/logo/2/favicon-white.svg" />
            <link
              rel="alternate icon"
              href="/logo/2/favicon_backup_white.ico"
            />
            <link
              rel="mask-icon"
              color="#ffffff"
              href="/logo/2/favicon-white.svg"
            />
          </>
        )}

        {noIndex && <meta name="robots" content="noindex" />}

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
