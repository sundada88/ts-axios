const toString = Object.prototype.toString

export function isArray (val: any): boolean {
  return Array.isArray(val)
}

// export function isObject (val: any): val is object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject (val: any): val is object {
  return toString.call(val) === '[object Object]'
}

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isUndefined (val: any): boolean {
  return typeof val === 'undefined'
}
