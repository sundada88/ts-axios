import { isPlainObject } from "./utils"


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