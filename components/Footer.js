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
        <div className="flex flex-row items-center justify-center">
          <Link href="/about" className="font-ath text-base footer-text">
            About
          </Link>
          <a
            href="https://twitter.com/athdotooo"
            rel="noopener noreferrer"
            target="_blank"
            className="font-ath text-base footer-text"
          >
            Twitter
          </a>
          <a
            href="https://github.com/danielcolinjames/ath"
            rel="noopener noreferrer"
            target="_blank"
            className="font-ath text-base footer-text"
          >
            GitHub
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
          padding: 12px 12px;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default Footer;
