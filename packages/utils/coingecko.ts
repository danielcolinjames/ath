// export const fetchList = async () => {
//   const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
//   const list = await res.json();
//   return list;
// };

const cgRootUrl = process.env.COINGECKO_ROOT_URL;
const cgApiKey = process.env.COINGECKO_API_KEY;

export const fetchList = async () => {
  const res = await fetch(`${cgRootUrl}/coins/list`);
  const list = await res.json();
  return list;
};

function generateCgUrl(route: string, params: Record<string, string>) {
  if (!route.startsWith("/")) {
    route = `/${route}`;
  }
  let url = new URL(`${cgRootUrl}${route}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
  }
  if (cgApiKey) {
    url.searchParams.append("x_cg_pro_api_key", cgApiKey);
  }
  return url.toString();
}

export async function fetchFromCoingecko(
  route: string,
  params: Record<string, string>,
) {
  const res = await fetch(generateCgUrl(route, params));
  const data = await res.json();
  return data;
}
