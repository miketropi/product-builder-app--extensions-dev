export const getShopifyProductJson = async (productURL) => {
  const res = await fetch(`${ productURL }.json`);
  return res.json();
}

export const toPrice = (price) => {
  let money_format = window.__MONEY_FORMAT;
  let __price = new Intl.NumberFormat('en-DE').format(price);
  return money_format.replace('{{amount_no_decimals_with_comma_separator}}', __price);
}

export const addToCart = async (data) => {
  const res = await fetch(`/cart/add.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

  return res;
}

export const renderContents = (contentObj) => {
  Object.keys(contentObj).forEach(selector => {
    document.querySelector(`#${ selector }`).innerHTML = contentObj[selector];
  })
}