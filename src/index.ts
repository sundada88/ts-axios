import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { buildURL } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios (config: AxiosRequestConfig) {
  // TODO:
  // 处理 config
  processConfig(config)
  xhr(config)
}

function processConfig (config: AxiosRequestConfig): void {
  // 处理 url
  config.url = transformURL(config)
  // 处理  headers
  config.headers = transformHeaders(config)
  // 处理 data
  config.data = transformRequestData(config)
}

function transformURL (config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders (config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
