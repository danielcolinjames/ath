import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="w-full fixed z-30">
      <div className="bg-black h-4" />
      <div className="py-4 bg-white flex justify-start items-center w-full max-w-2xl mx-auto px-5">
        <Link href="/">
          <a className="p-0 m-0 -mb-2">
            <Image
              className="image-override"
              src="/athwordmark.png"
              width={128}
              height={25}
              alt="ATH.ooo logo"
            />
          </a>
        </Link>
      </div>
      <div className="bg-black w-full h-px" />
    </div>
  );
};

export default NavBar;
