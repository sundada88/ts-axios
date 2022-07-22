import { resolve } from "dns";
import { transformData, transformResponse } from "./helper/data";
import { processHeaders } from "./helper/header";
import { buildUrl } from "./helper/url";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";
import { xhr } from "./xhr";

 function axios(config: AxiosRequestConfig): AxiosPromise {
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
   return xhr(config).then(res => {
      return transformResponseData(res)
   })
 }

 function processConfig(config: AxiosRequestConfig) {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
 }

 function transformUrl(config: AxiosRequestConfig): string {
    const {url, params} = config
    return buildUrl(url, params)
 }

 function transformHeaders(config: AxiosRequestConfig) {
    const {headers = {}, data} = config
    return processHeaders(headers, data)
 }

 function transformRequestData(config: AxiosRequestConfig): any {
    return transformData(config.data)
 }

 function transformResponseData(res: AxiosResponse): AxiosResponse {
   res.data = transformResponse(res.data)
   return res
 }

 export default axios