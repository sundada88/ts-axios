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
}

function transformURL (config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
export default axios
