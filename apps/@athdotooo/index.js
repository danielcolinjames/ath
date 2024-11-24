import Twitter from "twitter";
import fetch from "node-fetch";
import { differenceInMinutes, parseISO } from "date-fns";

const client = new Twitter({
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
});

const URL = `https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=250`;

const formatNumber = (incomingNumber) => {
  if (incomingNumber > 1000) {
    return incomingNumber?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  } else if (incomingNumber > 1) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (incomingNumber < 0.0000001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 9,
    });
  } else if (incomingNumber < 0.000001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 8,
    });
  } else if (incomingNumber < 0.00001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 7,
    });
  } else if (incomingNumber < 0.0001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
    });
  } else if (incomingNumber < 0.001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 5,
    });
  } else if (incomingNumber < 0.01) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 4,
    });
  } else {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }
};

async function grabAths() {
  const data = await fetch(URL);
  const json = await data.json();

  const market = json.sort((a, b) => {
    return a.ath_date < b.ath_date ? 1 : b.ath_date < a.ath_date ? -1 : 0;
  });
  return market;
}

async function main() {
  const listOfCoins = await grabAths();

  const listWithDiff = await Promise.all(
    listOfCoins.map(async (c) => {
      const diff = Math.abs(
        differenceInMinutes(parseISO(c.ath_date), new Date()),
      );
      c.recencyInMinutes = diff;

      if (diff <= 15) {
        c.toTweet = true;
        // TODO: push into list to update bio
        const moreInfo = await (
          await fetch(`https://api.coingecko.com/api/v3/coins/${c.id}?localization=en&tickers=true&market_data=false&community_data=true&developer_data=true&sparkline=false
      `)
        ).json();

        const rand = Math.random() * 4;

        // TODO: make this seeded randomness so it doesn't dupe tweets
        let emoji;
        if (rand > 3) {
          emoji = "🚀";
        } else if (rand > 2) {
          emoji = "🧑‍🚀";
        } else if (rand > 1) {
          emoji = "🔥";
        } else {
          emoji = "🌙";
        }

        const rand2 = Math.random() * 4;
        let funPhrase;
        if (rand2 > 3) {
          funPhrase = "LFG";
        } else if (rand2 > 2) {
          funPhrase = "To the moon!";
        } else if (rand2 > 1) {
          funPhrase = "WAGMI";
        } else {
          funPhrase = "Great success!";
        }

        c.emoji = emoji;
        c.funPhrase = funPhrase;

        if (moreInfo?.links?.twitter_screen_name) {
          c.twitterHandle = moreInfo.links.twitter_screen_name;
        }
        // console.log(c.twitterHandle);
      } else {
        c.toTweet = false;
      }
      c.extraString =
        Math.random() * 100 < 20
          ? "\nFollow @ATHdotooo to get ATH updates in your timeline. Turn on notifications for maximum degeneracy."
          : "";

      // TODO: check if asset info has twitter account to @, add it to c.projectTwitterHandle
      // console.log(c);

      return c;
    }),
  );

  const toTweetList = listWithDiff.filter((coin) => coin.toTweet);

  // console.log(toTweetList);

  // TODO: fetch bio, replace first x (up to 3) asset links in bio with most recent ones, push the others down the list

  // TODO: take most recent asset, update profile pic (need new dynamic og repo and deployment)

  toTweetList.map(async (asset) => {
    if (asset.toTweet) {
      const ticker = asset.symbol.toUpperCase();
      // const tweetText = `[TEST TWEET]`;
      let tweetText = "";
      tweetText += asset.name;
      tweetText += " just hit a new all-time high of ";
      tweetText += formatNumber(asset.ath);
      tweetText += "! 🚀\n";
      // if (asset?.twitterHandle) {
      //   tweetText += `@${asset.twitterHandle} `;
      // }
      const links = [
        `$${ticker}`,
        `#${ticker}`,
        `#${asset.name.replace(/[\W_]+/g, "")}`,
        `ath.ooo/${ticker}`,
      ].join(" ");
      // tweetText += `$${asset.symbol.toUpperCase()} `;
      // tweetText += `#${asset.symbol.toUpperCase()}`;
      // tweetText += `\nSee more: ath.ooo/${asset.symbol.toUpperCase()} 👇️`;
      tweetText += links;

      //   `${
      //   asset.name
      // } just hit a new all-time high of $${formatNumber(asset.ath)}! ${
      //   asset.emoji
      // } ${asset.funPhrase}${
      //   asset?.extraString !== undefined ? `\n${asset?.extraString}\n` : "\n"
      // }$${asset.symbol.toUpperCase()}${
      //   asset?.twitterHandle ? ` @${asset?.twitterHandle}` : ""
      // } ath.ooo/${asset.symbol.toUpperCase()}`;

      // console.log(tweetText);
      console.log(tweetText);

      await client.post(
        "statuses/update",
        { status: tweetText },
        function (error, tweet, response) {
          // if (error) throw error;
          // console.log(tweet); // Tweet body.
          // console.log(response); // Raw response object.
        },
      );
    }
  });
  console.log("done at", new Date());
}

main().catch((err) => console.error(err));
