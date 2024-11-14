// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

const exampleTickers = ["hnt", "mobile", "sol", "eth", "shib"];

import Link from "next/link";
import { Layout } from "../components/Layout";
import RootLayout from "./layout";

export default function Page(): JSX.Element {
  return (
    // ath-green is #00FF00
    <div>
      <div className="flex flex-col">
        {exampleTickers.map((ticker) => (
          <Link href={`/${ticker}`} key={ticker} className="text-xl">
            {ticker.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
