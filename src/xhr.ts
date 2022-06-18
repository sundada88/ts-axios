import { AxiosRequestConfig } from './types'

export default function xhr (config: AxiosRequestConfig) {
  // 使用 XMLHttpRequest 进行请求
  const { data = null, url, methods = 'get' } = config
  const xhr = new XMLHttpRequest()
  xhr.open(methods.toLocaleUpperCase(), url, true)
  xhr.send(data)
}
