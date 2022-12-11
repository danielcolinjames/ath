import { SocialIcon } from "react-social-icons";
import { rgbaStringFromRGBObj } from "../utils/colors";
import { generateOtherLinks, generateSocialLinks } from "../utils/links";

const removeHttp = (url) => {
  return url.replace(/^https?:\/\/(w{3}.)?/, "");
};

const removeTrailingSlash = (str) => {
  return str.replace(/\/+$/, "");
};

const LinkString = ({ url }) => {
  const strippedUrl = removeTrailingSlash(removeHttp(url));

  const [root, ...rest] = strippedUrl.split("/");

  return (
    <p className="truncate text-sm text-ellipsis text-clip">
      <span className="">{root}</span>
      {rest.map((part, _i, { length }) => {
        return (
          <span className="opacity-30">
            {length > 0 ? "/" : ""}
            {part}
          </span>
        );
      })}
    </p>
  );
};

const SOCIAL_LINK_SIZE = 30;

const generateIcon = (link) => {
  if (link.icon === "block") {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    );
  } else if (link.icon === "explorer") {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
      />
    );
  } else {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    );
  }
};

const LinksSection = ({ palette, assetInfoExtended }) => {
  const socialLinks = generateSocialLinks(assetInfoExtended.links);
  const otherLinks = generateOtherLinks(assetInfoExtended.links);

  return (
    <div>
      <h3 className="text-gray-500 pb-1 pt-5">
        Website and Block Explorer Links
      </h3>
      <div className="inline-block overflow-auto w-full">
        <div className="flex flex-col space-y-1 w-full">
          {otherLinks.map((link) => {
            const icon = generateIcon(link);
            return (
              <a
                key={link.url}
                href={link.url}
                className="rounded-full flex items-center justify-start space-x-1 overflow-hidden w-full bg-gray-50 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.75),
                }}
              >
                <div
                  className="p-1 rounded-full"
                  style={{
                    backgroundColor: rgbaStringFromRGBObj(
                      palette.DarkVibrant.rgb,
                      0.085
                    ),
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      minWidth: SOCIAL_LINK_SIZE - 10,
                      minHeight: SOCIAL_LINK_SIZE - 10,
                    }}
                  >
                    {icon}
                  </svg>
                </div>
                <LinkString url={link.url} />
              </a>
            );
          })}
        </div>
        <h3 className="text-gray-500 pb-1 pt-5">Social Links</h3>
        <div className="flex flex-row space-x-2 mt-2">
          {socialLinks.map((link, i) => {
            return (
              <SocialIcon
                key={`link-${i}`}
                url={link}
                bgColor={rgbaStringFromRGBObj(palette.DarkVibrant.rgb, 0.1)}
                fgColor={rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.75)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: SOCIAL_LINK_SIZE,
                  height: SOCIAL_LINK_SIZE,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinksSection;
