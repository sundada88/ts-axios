import { Method } from "../types"
import { deepMerge, isPlainObject } from "./utils"


function normalizeHeaderName(headers:any, normalizeName: string) {
    if (!headers) return
    Object.keys(headers).forEach(name => {
        if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase() ) {
            headers[normalizeName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any) {
    normalizeHeaderName(headers, 'Content-Type')
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
          headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

export function parseHeaders(headers:string): any {
    let parsed = Object.create(null)
    if (!headers) parsed
    headers.split("\r\n").forEach(item => {
        let [key, val] = item.split(':')
        key = key.trim().toLowerCase()
        if (!key) return
        parsed[key] = val
    })
    return parsed
}

/*
    headers: {
        common: {
            Accept: 'application/json, text/plain, *\/*',
        },
        post: {
            Content-Type: 'a'
        }
    }

    => => => =>
    headers: {
        Accept: 'applica',
        Cotent-Type: 'a'
    }

    function deepMerge(...objs) {
        const result = Object.create({})
        objs.forEach(obj => {
            if (obj) {
                Object.keys(obj).forEach(key => {
                    const val = obj[key]
                    if (isPlainObject(val)) {
                        if (isPlainObject(resule[key])) {
                            result[key] = deepMerge(result[key], val)
                        } else {
                            result[key] = deepMerge({}, val)
                        }
                    } else {
                        result[key] = val
                    }
                })
            }
        })
        return result
    }
*/ 
export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) return headers
    headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
    methodsToDelete.forEach(method => {
        delete headers[method]
    })
    return headers
}