import ProxyApi from "./proxyApi";

export default class FunnelProxyApi extends ProxyApi {
  constructor() {
    super('funnel');
  }

  async funnelOptionsFilter(dataFilter) {
    const res = await this.request({
      task: 'funnelOptionsFilter',
      data: dataFilter,
    }); 

    // console.log('funnelOptionsFilter', res);
    return res;
  }
}