import { flattenHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { transform } from './transform'
import xhr from './xhr'

export default function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  // TODO:
  // 处理 config
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig (config: AxiosRequestConfig): void {
  // 处理 url
  config.url = transformURL(config)
  console.log(config.url)
  // 处理  headers
  // config.headers = transformHeaders(config)
  // // 处理 data
  // config.data = transformRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)

  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL (config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}
function transformResponseData (res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
