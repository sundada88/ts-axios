import { AxiosRequestConfig } from "../types";

export function xhr(config: AxiosRequestConfig) {
    const {method, url, data, headers } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(name => {
        console.log(name)
       if (data === null && name.toLowerCase() === 'content-type') {
         delete headers[name]
       } else {
         request.setRequestHeader(name, headers[name])
       }
    })
    request.send(data)
}