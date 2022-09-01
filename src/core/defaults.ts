import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";
import { AxiosRequestConfig } from "../types";

const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    transformRequest: [
        function (data: any, headers: any) {
            processHeaders(headers, data)
            return transformRequest(data)
        }
    ],
    transformResponse: [
        function (data: any) {
            return transformResponse(data)
        }
    ]
}

const methodNoData = ['delete', 'get', 'head', 'options']

methodNoData.forEach(method => {
    defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults