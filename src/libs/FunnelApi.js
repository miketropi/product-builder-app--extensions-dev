import BuildmatApi from "./BuildmatApi";

export default class FunnelApi extends BuildmatApi {
  
  constructor(store_id) {
    super(store_id, 'funnel');
  }
}