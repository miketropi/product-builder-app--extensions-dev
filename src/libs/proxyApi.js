export default class ProxyApi {

  __PROCCESS = ''
  __PROXY_ENDPOINT = '/apps/bmapp'

  constructor(proccess) {
    this.__PROCCESS = proccess;
  }

  async request(data, method = 'POST') {
    return new Promise((resolve, reject) => {
      fetch(this.__PROXY_ENDPOINT, {
        method,
        redirect: 'manual', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          proccess: this.__PROCCESS,
          args: data
        }),
      })
      .then(async (res) => {
        resolve( await res.json() ); 
      })
      .catch((err) => {
        reject(err)
      })
    })
  }


}