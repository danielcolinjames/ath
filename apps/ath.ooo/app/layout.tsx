import "./globals.css";
import localFont from "next/font/local";
import GoogleAnalytics from "../components/GoogleAnalytics";
import MetaTags from "../components/MetaTags";
import { hexToRgb } from "../../../packages/utils/colors";
import { Metadata } from "next";
import { ThemeManager } from "../components/ThemeManager";

export const dynamic = "force-dynamic";

// Font files can be colocated inside of `app`
const satoshiFont = localFont({
  src: "../assets/fonts/Satoshi-Variable.ttf",
  display: "swap",
  variable: "--font-satoshi",
});

const defaultThemeColor = "#00FFBA";
const defaultRgb = hexToRgb(defaultThemeColor);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshiFont.variable} dark`}>
      <MetaTags rgb={defaultRgb} />
      <body className={satoshiFont.className}>
        <ThemeManager />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {/* to account for navbar */}
        {/* <NavBar accentColor="#00FFBA" /> */}
        <div className="flex w-full">{children}</div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
    ],
  },
  title: "ath.ooo",
  openGraph: {
    images: ["https://ath.ooo/logo/2/og.png"],
  },
};
