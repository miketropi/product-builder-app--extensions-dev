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
  try {
    const res = await fetch(`/cart/add.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  
    return res;
  } catch (err) { 
    return false;
  }
}

export const renderContents = (contentObj) => {
  Object.keys(contentObj).forEach(selector => {
    document.querySelector(`#${ selector }`).innerHTML = contentObj[selector];
  })
}

export const deepSearch = (data, value, key = '__key', sub = 'children', tempObj = {}) => {
  if (value && data) {
    data.find((node) => {
      if (node[key] == value) {
        tempObj.found = node;
        // console.log('tempObj.found', data[0].name);
        return node;
      }
      return deepSearch(node[sub], value, key, sub, tempObj);
    });
    if (tempObj.found) {
      return tempObj.found;
    }
  }
  return false;
};

export const deepSearch_API = (data, value, key = '__key', sub = 'children', tempObj = {}) => {
  if (value && data) {
    data.find((node) => {
      if (node[key] == value) {

        // console.log(node.name, data[0].name)
        node.hook = () => {
          return { 
            parentNode: data, 
            node 
          }
        }

        tempObj.found = node;
        return node;
      }
      return deepSearch_API(node[sub], value, key, sub, tempObj);
    });
    if (tempObj.found) {
      return tempObj.found;
    }
  }
  return false;
}