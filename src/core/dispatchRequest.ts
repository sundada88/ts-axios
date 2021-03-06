import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
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
function transformResponseData (res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
