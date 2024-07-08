export default class BuildmatApi {
  STORE_ID = '';
  API_ENDPOINT = ''
  API_KEY = ''
  MODEL = ''
  
  constructor(store_id, model) {
    this.STORE_ID = `gid://shopify/Shop/${ store_id }`;
    this.API_ENDPOINT = process.env.MIX_ENDPOINT;
    this.API_KEY = process.env.MIX_API_KEY;
    this.MODEL = model;

    return this;
  }

  async __request(__url, data, method = 'GET') {
    const response = await fetch(`${ this.API_ENDPOINT }${ __url }`, {
      method,
      cache: "no-cache", 
      headers: {
        "Content-Type": "application/json",
        'api-key': this.API_KEY
      },
      body: JSON.stringify(data), 
    });

    return response.json();
  }

  async getItem(id) {
    try {
      const res = await this.__request(`content/item/${ this.MODEL }/${ id }`);
      return res;
    } catch(err) {
      return false
    }
  }
}