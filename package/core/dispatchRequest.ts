import { xhr } from "./xhr";
import { transformRequest, transfromResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";
import { buildURL } from "../helpers/url";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export default function dispatchRequest (config: AxiosRequestConfig):AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: AxiosRequestConfig) {
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig):string {
    const {url, params} = config
    return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig) {
    return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
    const {headers = {}, data} = config
    return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transfromResponse(res.data)
    return res
}