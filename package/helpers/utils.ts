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

export function isString (val: any): val is string {
  return toString.call(val) === '[object String]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}