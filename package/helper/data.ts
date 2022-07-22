import { AxiosRequestConfig } from "../types";
import { isPlainObject } from "./utils";

export function transformData(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}

export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch (e) {
            // do nothing
        }
    }
    return data
}