import { AxiosRequestConfig } from "./types";

export function xhr(config: AxiosRequestConfig) {
    const {method = 'get', url, data, params} = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(),url, true)
    request.send()
}