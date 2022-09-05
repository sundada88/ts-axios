import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 使用 XMLHttpRequest 进行请求
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url!, true)

    if (timeout) {
      request.timeout = timeout
    }
    
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.onreadystatechange = function handleLoad () {
      if (request.readyState !== 4) return
      if (request.status === 0) return
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
      // resolve(response)
      handleResponse(response)
    }

    // 处理网络错误
    request.onerror = function handleError () {
      // reject(new Error('Network error!'))
      reject(createError('Network error!', config, null, request))
    }

    // 处理超时
    request.ontimeout = function handleTimeout () {
      // reject(new Error(`Timeout of ${timeout} ms exceeded!`))
      reject(createError(`Timeout of ${timeout} ms exceeded!`, config, 'ECONNABORTED', request))
    }

    // 设置请求头
    Object.keys(headers).forEach(name => {
      // 如果 data 是 null，那么 content-type 是没有意义的
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
    //
    function handleResponse (response: AxiosResponse): void {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
