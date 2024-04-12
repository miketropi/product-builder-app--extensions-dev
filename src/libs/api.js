export default class ProductBuilderApi {

  API_ENDPOINT = ''
  API_KEY = ''
  
  construct(API_ENDPOINT, API_KEY) {
    this.API_ENDPOINT = API_ENDPOINT;
    this.API_KEY = API_KEY
  }

  async __request() {
    return '';
  }

  async getProduct(shopifyProductID) {

  }
}