/*
  axios({
    methods: 'get',
    url: '/get/name',
    params: {
      a: ['aa', 'aaa'],
    }
  })
*/

import { isArray, isDate, isPlainObject, isUndefined } from './utils'

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

export function buildURL (url: string, params?: any): string {
  if (!params) {
    return url
  }
  // 将所有的 param 放到数组里面, 最后通过 join 实现
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || isUndefined(val)) return
    let values: string[]
    // 如果 val 是数组
    if (isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    // 为什么会遍历 values?
    // a: ['aa', 'aaa'] => ?a[]=aa&a[]=aaa, 所以 key 是一样的，需要根据 values 的长度达到 parts 中 ['a[]=aa', 'a[]=aaa']
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // 不管是key 还是 value 都需要 encode
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // ['a[]=aa', 'a[]=aaa'] => 'a[]=aa&a[]=aaa'
  const serializedParams = parts.join('&')
  if (serializedParams) {
    // 如果 url 中有 hash 字段，则将 hash 字段全部去掉
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 根据前面是否有 ? 判断是否已经有了 query 参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
