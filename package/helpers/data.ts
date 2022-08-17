import { isPlainObject, isString } from "./utils";

export function transfromResponse(data: any): any {
    if (isString(data)) {
        try {
            data = JSON.parse(data)
        } catch (error) {
            // do nothing
        }
    }
    return data
}

export function transformRequest(data: any):any{
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}