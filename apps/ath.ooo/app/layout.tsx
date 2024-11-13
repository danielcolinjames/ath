import "./globals.css";
import localFont from "next/font/local";
import GoogleAnalytics from "../components/GoogleAnalytics";
import NavBar from "../components/NavBar";

// Font files can be colocated inside of `app`
const satoshiFont = localFont({
  src: "../assets/fonts/Satoshi-Variable.ttf",
  display: "swap",
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshiFont.variable} dark`}>
      <body className={satoshiFont.className}>
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
