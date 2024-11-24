import { SocialIcon } from "react-social-icons";
import { rgbaStringFromRGBObj } from "@repo/utils/colors";
import { generateOtherLinks, generateSocialLinks } from "@repo/utils/links";

const removeHttp = (url: string) => {
  // eslint-disable-next-line security/detect-unsafe-regex
  return url.replace(/^https?:\/\/(w{3}.)?/, "");
};

const removeTrailingSlash = (str: string) => {
  return str.replace(/\/+$/, "");
};

const LinkString = ({ url }: { url: string }) => {
  const strippedUrl = removeTrailingSlash(removeHttp(url));

  const [root, ...rest] = strippedUrl.split("/");

  return (
    <p className="truncate text-sm text-ellipsis">
      <span className="font-semibold">{root}</span>
      {rest.map((part, _i, { length }) => {
        return (
          <span key={part} className="">
            <span className="px-1 font-medium opacity-30">
              {length > 0 ? "/" : ""}
            </span>
            <span className="opacity-40 font-light">{part}</span>
          </span>
        );
      })}
    </p>
  );
};

const SOCIAL_LINK_SIZE = 30;

const generateIcon = (link: any) => {
  if (link.icon === "block") {
    return (
      <path
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    );
  } else if (link.icon === "explorer") {
    return (
      <path
        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    );
  } else {
    return (
      <path
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    );
  }
};

const LinksSection = ({ palette, assetInfoExtended }: any) => {
  const socialLinks = generateSocialLinks(assetInfoExtended.links);
  const otherLinks = generateOtherLinks(assetInfoExtended.links);

  return (
    <div>
      <h3 className="text-gray-500 pb-1 pt-5">
        Website and Block Explorer Links
      </h3>
      <div className="inline-block overflow-auto w-full">
        <div className="flex flex-col space-y-1.5 w-full">
          {otherLinks.map((link: any) => {
            const icon = generateIcon(link);
            return (
              <a
                key={link.url}
                className="rounded-full flex items-center justify-start space-x-1 overflow-hidden w-full opacity-100 transition-all duration-150 hover:opacity-75"
                href={link.url}
                rel="noopener noreferrer"
                style={{ color: "white" }}
                target="_blank"
              >
                <div
                  className="p-1 rounded-full"
                  style={{
                    backgroundColor: rgbaStringFromRGBObj(
                      palette.Vibrant.rgb,
                      1,
                    ),
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    style={{
                      minWidth: SOCIAL_LINK_SIZE - 10,
                      minHeight: SOCIAL_LINK_SIZE - 10,
                    }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {icon}
                  </svg>
                </div>
                <span
                  className="pl-1"
                  style={{
                    color: rgbaStringFromRGBObj(palette.Vibrant.rgb, 1),
                  }}
                >
                  <LinkString url={link.url} />
                </span>
              </a>
            );
          })}
        </div>
        <h3 className="text-gray-500 pb-1 pt-5">Social Links</h3>
        <div className="flex flex-row space-x-2 mt-2">
          {socialLinks.map((link, i) => {
            return (
              <div
                key={`link-${i}`}
                className="opacity-100 hover:opacity-75 duration-150 transition-all"
              >
                <SocialIcon
                  bgColor={rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)}
                  fgColor="white"
                  rel="noopener noreferrer"
                  style={{
                    width: SOCIAL_LINK_SIZE,
                    height: SOCIAL_LINK_SIZE,
                  }}
                  target="_blank"
                  url={link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinksSection;
