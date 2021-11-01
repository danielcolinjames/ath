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

  const listWithDiff = listOfCoins.map((c) => {
    const diff = Math.abs(
      differenceInMinutes(parseISO(c.ath_date), new Date())
    );
    c.recencyInMinutes = diff;

    if (diff <= 15) {
      c.toTweet = true;
      // TODO: push into list to update bio
    } else {
      c.toTweet = false;
    }

    // TODO: check if asset info has twitter account to @, add it to c.projectTwitterHandle
    return c;
  });

  // TODO: fetch bio, replace first x (up to 3) asset links in bio with most recent ones, push the others down the list

  // TODO: take most recent asset, update profile pic (need new dynamic og repo and deployment)

  listWithDiff.map(async (asset) => {
    if (asset.toTweet) {
      const tweetText = `$${asset.symbol.toUpperCase()} (${
        asset.name
      }) hit a new all-time high of $${formatNumber(
        asset.ath
      )}! 🚀  https://ath.ooo/${asset.symbol.toUpperCase()}`;

      await client.post(
        "statuses/update",
        { status: tweetText },
        function (error, tweet, response) {
          if (error) throw error;
          // console.log(tweet); // Tweet body.
          // console.log(response); // Raw response object.
        }
      );
    }
  });
  console.log("done at", new Date());
}

main().catch((err) => console.error(err));
