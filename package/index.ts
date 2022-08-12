import { xhr } from "./core/xhr";
import { transformRequest } from "./helpers/data";
import { processHeaders } from "./helpers/headers";
import { buildURL } from "./helpers/url";
import { AxiosRequestConfig } from "./types";

export default function axios (config: AxiosRequestConfig) {
    processConfig(config)
    xhr(config)
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