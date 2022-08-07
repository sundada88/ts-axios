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

export function extend<T, K> (to: T, from: K): T & K {
  for (const key in from) {
    ;(to as T & K)[key] = from[key] as any
  }
  return to as T & K
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}