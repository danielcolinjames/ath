'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import hexToRgba from 'hex-to-rgba'
import { SmileIcon } from 'lucide-react'
// import { useAccentColor } from '../contexts/AssetColorContext'
// import { useAssetContext } from '../contexts/AssetColorContext'
import athLogoWithoutBar from '../public/images/ath-logo-without-bar.svg';
import athSquareWithoutBar from '../public/images/ath-square-without-bar.svg';
import athBar from '../public/images/ath-bar.svg';

const NavBar = ({ accentColor, ticker }: { accentColor: string, ticker?: string }) => {
  // const router = useRouter()
  // const { accentColor } = useAssetContext();
  // const accentColor = "#00FFBA"
  // const { accentColor } = useAccentColor();

  const handleKeydown = (event: any) => {
    // Disable the following keyboard shortcuts when the user is typing
    if (document?.activeElement?.tagName === 'INPUT') return
    if (document?.activeElement?.tagName === 'TEXTAREA') return

    if (event.key === '/') {
      event.preventDefault()
      // focusSearchBar()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let resultCount = 0

  // const handleKeyPress = (event: any) => {
  //   if (event.key === 'Enter' && filterText.length > 0 && resultCount !== 0) {
  //     // router.push(`/${filterText}`)
  //     setFilterText('')
  //     window.scrollTo(0, 0)
  //   }
  // }

  // const focusSearchBar = () => {
  //   input?.current?.focus()
  // }

  // const handleFilterTextChange = (event: any) => {
  //   setFilterText(event.target.value.toUpperCase())
  // }

  return (
    <div className="w-full h-14 bg-black/90 backdrop-blur-md fixed z-50 flex flex-row items-center border-b-2" style={{ borderBottomColor: `${accentColor}22` }}>
      <div className=" w-full h-full flex flex-row items-center justify-center" style={{ backgroundColor: `${accentColor}22` }}>
        <div className="flex flex-row items-center justify-between space-x-0 sm:space-x-1 w-full px-4 md:px-10 py-1">
          <div className="flex flex-row items-center justify-start w-full">
            <Link href='/'>
              <div className="flex relative w-10 justify-center items-center">
                <Image src={athLogoWithoutBar} className="absolute inset-0 w-10 h-full animate-opacityPulse" alt="Logo" />
                <Image src={athSquareWithoutBar} className="absolute inset-0 w-10 h-full" alt="Square" />
                <Bar color={accentColor} />
              </div>
            </Link>
            <p className='text-xl font-semibold ml-3' style={{ color: `${accentColor}aa` }}>
              / {ticker?.toUpperCase()}
            </p>
          </div>
          {/* <Link
          className="about-link p-1 rounded-md transition-all duration-200"
          href={`/${"HNT".toUpperCase()}`}>
          <SmileIcon style={{ color: 'rgba(0,255,186,1)' }} />
        </Link> */}
          <Link
            className="text-gray-500 font-ath font-light about-link py-1 px-2 rounded-md transition-all"
            href="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar

function Bar({ color }: { color: string }) {
  return (
    <svg width="auto" height="auto" viewBox="0 0 250 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_44_32)">
        <path d="M73.9741 22.4507L186.285 22.4507V-8.2016e-05L73.9741 -8.2016e-05V22.4507Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_44_32">
          <rect width="250" height="159.77" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}