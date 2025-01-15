import ProxyApi from "./proxyApi";

export default class PBuilderProxyApi extends ProxyApi {

  constructor() {
    super('productBuilder');
  }

  async getProductVariantByID(variantID) {
    const res = await this.request({
      task: 'getProductVariantByID',
      data: variantID,
    }); 

    return res;
  }
}