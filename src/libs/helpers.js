export const getShopifyProductJson = async (productURL) => {
  const res = await fetch(`${ productURL }.json`);
  return res.json();
}