import { AxiosRequestConfig } from "../types";
import { isPlainObject } from "./utils";

export function transformData(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}