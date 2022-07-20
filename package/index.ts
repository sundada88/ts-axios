import { buildUrl } from "./helper/url";
import { AxiosRequestConfig } from "./types";
import { xhr } from "./xhr";

 function axios(config: AxiosRequestConfig) {
    /*
    axios({
        method: 'get',
        url: '/base/get',
        params: {
        a: 1,
        b: 2
        }
    })
    */
   processConfig(config)
    xhr(config)
 }

 function processConfig(config: AxiosRequestConfig) {
    config.url = transformUrl(config)

 }

 function transformUrl(config: AxiosRequestConfig): string {
    const {url, params} = config
    return buildUrl(url, params)
 }

 export default axios