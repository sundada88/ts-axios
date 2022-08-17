import { parseHeaders } from "../helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export function xhr(config: AxiosRequestConfig):AxiosPromise {
  return new Promise(resolve => {
    const {method, url, data, headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
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
      resolve(response)

    }
    request.send(data)
  })
}