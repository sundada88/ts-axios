import { parseHeaders } from "../helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export function xhr(config: AxiosRequestConfig):AxiosPromise {
  return new Promise((resolve, reject) => {
    const {method, url, data, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (timeout) {
      request.timeout = timeout
    }
    if (responseType) {
      request.responseType = responseType
    }
    request.onerror = function handleError() {
      reject(new Error('Network error!'))
    }
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
    request.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(name => {
       if (data === null && name.toLowerCase() === 'content-type') {
         delete headers[name]
       } else {
         request.setRequestHeader(name, headers[name])
       }
    })
    request.onreadystatechange =  function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) return
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
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
    request.send(data)
    function handleResponse (response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
  })
}