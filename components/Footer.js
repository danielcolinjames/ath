import hexToRgba from "hex-to-rgba";
import Link from "next/link";

const Footer = ({ assetColors, rgb }) => {
  let r, g, b;
  if (rgb === undefined) {
    r = 45;
    g = 254;
    b = 193;
  } else {
    [r, g, b] = rgb;
  }
  return (
    <div className="w-full h-14 footer">
      <div
        className="mt-px h-1 w-full"
        style={{
          backgroundColor:
            assetColors !== undefined
              ? hexToRgba(assetColors.vibrant, 0.5)
              : "#00FFBA",
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 space-y-5 md:space-y-0">
          <Link href="/about">
            <a className="font-ath text-base footer-text">About</a>
          </Link>
          <a
            href="https://twitter.com/athdotooo"
            target="_blank"
            className="font-ath text-base footer-text"
          >
            Follow for updates
          </a>
          <a
            href="https://github.com/danielcolinjames/ath"
            target="_blank"
            className="font-ath text-base footer-text"
          >
            Help make the site better
          </a>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background-color: rgba(${r}, ${g}, ${b}, 0.0825);
        }
        .footer-text:hover {
          background-color: rgba(${r}, ${g}, ${b}, 0.125);
        }
        .footer-text {
          padding: 12px 18px;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default Footer;
