import Image from "next/image";
import Link from "next/link";
import athLogoWithoutBar from "../public/images/ath-logo-without-bar.svg";
import athSquareWithoutBar from "../public/images/ath-square-without-bar.svg";
import { AssetNavbar } from "../components/AssetNavbar";

function Bar({ color }: { color: string }) {
  return (
    <svg
      width="auto"
      height="auto"
      viewBox="0 0 250 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin-slow"
    >
      <g clipPath="url(#clip0_44_32)">
        <path
          d="M73.9741 22.4507L186.285 22.4507V-8.2016e-05L73.9741 -8.2016e-05V22.4507Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_44_32">
          <rect width="250" height="159.77" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function NotFound() {
  return (
    <>
      <AssetNavbar is404={true} />
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
        <div className="flex flex-col items-center justify-center gap-32 p-8">
          {/* Spinning Logo */}
          <div className="relative w-48 h-48 animate-bounce-gentle">
            <Image
              src={athLogoWithoutBar}
              className="absolute inset-0 w-full h-full animate-opacityPulse"
              alt="Logo"
            />
            <Image
              src={athSquareWithoutBar}
              className="absolute inset-0 w-full h-full"
              alt="Square"
            />
            <Bar color="#FF0000" />
          </div>

          {/* Error Message */}
          <div className="text-center">
            <p className="text-8xl md:text-[8rem] leading-[4rem] text-[#FF0000] font-black max-w-2xl mx-auto mb-8">
              404
            </p>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
              Asset not found
            </h1>
            <p className="text-xl md:text-2xl text-[#FF0000] font-light max-w-2xl mx-auto mb-8">
              This is not the all-time high you're looking for.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 text-lg font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
