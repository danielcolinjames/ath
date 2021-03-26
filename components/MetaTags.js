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
          <link
            rel="icon"
            sizes="any"
            href={`data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%201000%201000%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xml%3Aspace%3D%22preserve%22%20xmlns%3Aserif%3D%22http%3A%2F%2Fwww.serif.com%2F%22%20style%3D%22fill-rule%3Aevenodd%3Bclip-rule%3Aevenodd%3Bstroke-linejoin%3Around%3Bstroke-miterlimit%3A2%3B%22%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C-63.4977%2C-12363.3)%22%3E%3Cg%20id%3D%22Artboard1%22%20transform%3D%22matrix(0.260417%2C0%2C0%2C0.462963%2C63.4977%2C12363.3)%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%223840%22%20height%3D%222160%22%20style%3D%22fill%3Anone%3B%22%2F%3E%3CclipPath%20id%3D%22_clip1%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%223840%22%20height%3D%222160%22%2F%3E%3C%2FclipPath%3E%3Cg%20clip-path%3D%22url(%23_clip1)%22%3E%3Cg%20transform%3D%22matrix(6.77059%2C0%2C0%2C3.80846%2C-4424.93%2C-1380.16)%22%3E%3Cg%20transform%3D%22matrix(614.214%2C0%2C0%2C614.214%2C477.583%2C929.552)%22%3E%3Crect%20x%3D%220.42%22%20y%3D%22-0.476%22%20width%3D%220.11%22%20height%3D%220.476%22%20style%3D%22fill%3A${
              systemTheme !== "dark" ? "rgb(0,0,0)" : "rgb(255,255,255)"
            }%3B%22%20id%3D%22rectangle%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(614.214%2C0%2C0%2C614.214%2C869.264%2C929.552)%22%3E%3Crect%20x%3D%220.073%22%20y%3D%22-0.65%22%20width%3D%220.11%22%20height%3D%220.65%22%20style%3D%22fill%3A${
              systemTheme !== "dark" ? "rgb(0,0,0)" : "rgb(255,255,255)"
            }%3B%22%20id%3D%22rectangle%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(614.214%2C0%2C0%2C614.214%2C1049.51%2C929.552)%22%3E%3Crect%20x%3D%220.069%22%20y%3D%22-0.825%22%20width%3D%220.11%22%20height%3D%220.825%22%20style%3D%22fill%3A${
              systemTheme !== "dark" ? "rgb(0,0,0)" : "rgb(255,255,255)"
            }%3B%22%20id%3D%22rectangle%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(5.27013%2C0%2C0%2C1.80821%2C-11845.9%2C-1831.62)%22%3E%3Crect%20x%3D%222353.03%22%20y%3D%221012.95%22%20width%3D%22544.81%22%20height%3D%22127.661%22%20style%3D%22fill%3Argb(${r},${g},${b})%3B%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`}
          />
        ) : systemTheme !== "dark" ? (
          <link rel="icon" href="/images/ath.svg" />
        ) : (
          <link rel="icon" href="/images/ath-white.svg" />
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
