import { parseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    // 使用 XMLHttpRequest 进行请求
    const { data = null, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function handleLoad () {
      if (request.readyState !== 4) return
      // 将 string 的 headers 转换为 object 的形式
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
    // 设置请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}