import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { EMOJIS, TOKENLIST } from "../utils/constants";
import { getMarkets } from "../utils/protocol";
import { getKeyByValue } from "../utils/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [markets, setMarkets] = useState<any>(null);

  useEffect(() => {
    async function fetchMarkets() {
      let token = TOKENLIST["USDT"];
      const tokenName = getKeyByValue(TOKENLIST, token);
      const result = await getMarkets(token);
      setMarkets(result);
      console.log("Result: ");
      console.log(result);
    }

    fetchMarkets();
  }, []);

  return (
    <>
      <main>
        <h1 className={styles.title}> Market Data </h1>

        {markets && (
          <div className={`flex`}>
            <h1>Against Outcome -{markets.prices.againstOutcomePrice}</h1>
            <h1>For Outcome -{markets.prices.forOutcomePrice}</h1>
            <h1>Market Outcome -{markets.prices.marketOutcome}</h1>
            <h1>
              Market Outcome Against -{markets.prices.marketOutcomeAgainst}
            </h1>
          </div>
        )}
      </main>
    </>
  );
}
