export const fetchList = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await res.json();
  return list;
};
