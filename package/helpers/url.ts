import { isDate, isPlainObject, isUndefined } from "./utils"
function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// {a: 1, b: 2, c:[1,2]} => ?a=1&b=2&c[]=1&c[]=2
export function buildURL(url, params): string {
    if (!params) return url
    const parsed:string[] = []
    Object.keys(params).forEach(key => {
        const val = params[key]
        if (val == null || isUndefined(val)) return
        let values:string[]
        if (Array.isArray(val)) {
            values = val
            key += '[]'
        } else {
            values=[val]
        }
        values.forEach(val => {
          if (isDate(val)) {
            val = val.toISOString()
          } else if (isPlainObject(val)) {
            val = JSON.stringify(val)
          }
          // 不管是key 还是 value 都需要 encode
          parsed.push(`${encode(key)}=${encode(val)}`)
        })
    })
    const serializedParams = parsed.join('&')
    if (serializedParams) {
        const markIndex = url.indexOf('#')
        if (markIndex!==-1) {
            url = url.slice(0, markIndex)
        }
        url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
    }
    return url
}