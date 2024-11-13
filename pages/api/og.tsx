import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const sb = fetch(
  new URL("../../assets/Satoshi-Black.otf", import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const name = searchParams.get("n");
  const ticker = searchParams.get("t");
  const imageUrl = searchParams.get("i");

  const r = searchParams.get("r") as unknown as number;
  const g = searchParams.get("g") as unknown as number;
  const b = searchParams.get("b") as unknown as number;

  const whiteText = searchParams.get("w");

  const satoshiBlack = await sb;

  const textColor = whiteText === "1" ? "white" : "black";

  return new ImageResponse(
    (
      <div tw="flex bg-black h-full">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            src={imageUrl}
            tw="w-[590px] h-[590px] absolute left-[15px] top-[20px] bottom-[20px]"
          />
        )}
        <div
          style={{
            background: `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.5), rgba(${r}, ${g}, ${b}, 0.25))`,
          }}
          tw="w-full h-full p-4 h-full flex flex-row justify-center items-center"
        >
          <div tw="shadow-2xl h-full rounded-2xl w-full h-full flex flex-row justify-center items-center">
            <div
              style={{
                height: "100%",
                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.92)`,
                width: "100%",
                flexShrink: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              tw="rounded-l-xl"
            >
              <div tw="h-full w-full flex flex-col p-10 items-start justify-end">
                <p
                  style={{
                    fontSize: 130,
                    color: textColor,
                    marginLeft: -8,
                    marginBottom: -24,
                  }}
                  tw="font-bold break-all w-full"
                >
                  {ticker}
                </p>
                <p style={{ color: textColor }} tw="text-7xl font-bold w-full">
                  {name}
                </p>
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "33.3333%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              tw="rounded-r-xl bg-white/95"
            >
              <div tw="h-full w-full flex flex-col justify-between items-end p-10">
                <svg
                  fill="none"
                  height={52 * 1.2}
                  viewBox="0 0 85 52"
                  width={85 * 1.2}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.5483 51.1959H24.3361V46.7495C23.4494 48.139 22.0306 49.195 20.198 50.0287C18.3654 50.8069 16.4145 51.1959 14.2272 51.1959C11.3305 51.1959 8.84762 50.5846 6.77854 49.3062C4.70947 47.9722 3.17244 46.2492 2.04923 44.026C0.985137 41.8027 0.512206 39.246 0.571323 36.4114C0.630439 33.5212 1.2216 31.02 2.34481 28.9079C3.46803 26.7958 5.06417 25.1284 7.07413 23.9612C9.1432 22.794 11.5079 22.1826 14.2272 22.1826C16.4145 22.1826 18.4245 22.6273 20.2571 23.5166C22.1488 24.3503 23.4494 25.6286 24.3361 27.2405V22.1826H31.5483V51.1959ZM15.8825 45.082C17.5377 45.082 18.9565 44.7485 20.198 44.026C21.4394 43.3034 22.4444 42.3585 23.0947 41.0802C23.7449 39.8018 24.0996 38.3567 24.0996 36.7449C24.0996 35.0774 23.7449 33.6323 23.0947 32.354C22.4444 31.0756 21.4394 30.1307 20.198 29.4637C18.9565 28.7412 17.5377 28.4077 15.8825 28.4077C14.2272 28.4077 12.8084 28.7412 11.567 29.4637C10.3255 30.1863 9.37966 31.1312 8.72938 32.4095C8.0791 33.6879 7.78352 35.133 7.78352 36.7449C7.78352 38.3567 8.0791 39.8018 8.72938 41.0802C9.37966 42.3585 10.3255 43.3034 11.567 44.026C12.8084 44.7485 14.2272 45.082 15.8825 45.082Z"
                    fill="black"
                  />
                  <path
                    d="M33.1914 22.1954H51.5175V28.1273H33.1914V22.1954ZM45.9606 51.2088H38.7484V14.854H45.9606V51.2088Z"
                    fill="black"
                  />
                  <path
                    d="M60.3958 51.2065H53.1836V7.51025H60.3958V25.8932C61.3417 24.4249 62.6422 23.309 64.2975 22.4868C65.9527 21.7233 67.8445 21.3121 69.9135 21.3121C73.697 21.3121 76.4755 22.428 78.249 24.6011C79.9633 26.8329 80.8501 29.7695 80.8501 33.3521V51.2065H73.697V35.0553C73.697 33.4696 73.5196 32.2362 73.1058 31.2965C72.692 30.3568 72.2191 29.652 71.5688 29.1234C70.9185 28.5949 70.2682 28.2425 69.618 28.0663C68.9086 27.8901 68.2583 27.8313 67.608 27.8313C66.8395 27.8313 66.0119 27.9488 65.1842 28.1837C64.2975 28.4187 63.529 28.8298 62.8196 29.3584C62.1102 29.9457 61.519 30.7092 61.1052 31.6489C60.6323 32.5886 60.3958 33.7632 60.3958 35.2315V51.2065Z"
                    fill="black"
                  />
                  <path
                    d="M24.3355 7.5L60.3965 7.5V0.334776L24.3355 0.334776V7.5Z"
                    fill="black"
                  />
                  <rect
                    fill={`rgba(${r}, ${g}, ${b}, 1)`}
                    height="7.2867"
                    stroke-width="none"
                    width="35.99"
                    x="24.3789"
                    y="0.262207"
                  />
                </svg>

                {imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" src={imageUrl} tw="w-[300px] h-[300px]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Satoshi-Black",
          data: satoshiBlack,
          style: "normal",
        },
      ],
    },
  );
}
