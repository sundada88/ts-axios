import { time } from "console";
import { parseHeaders } from "./helper/header";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";

export function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        
        const {method = 'get', url, data = null, headers, responseType, timeout } = config
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        request.open(method.toUpperCase(),url, true)
        // handle error
        // 1. xml 的 error 事件
        request.onerror = function handleError () {
            reject(new Error('Network Error'))
        }
        // 2. 超时处理
        if (timeout) {
            request.timeout = timeout
        }
        request.ontimeout = function handleTimeout() {
            reject(new Error(`Timeout of ${timeout} ms exceeded`))
        }
        // 3. 处理非200状态码
        function handleResponse(response: AxiosResponse) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(new Error(`Request failed with status code ${response.status}`))
            }

        }
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
        
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