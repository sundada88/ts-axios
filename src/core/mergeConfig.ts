import { deepMerge, isPlainObject, isUndefined } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";

const strats = Object.create(null)

// 默认合并策略
function defaultStrat(val1: any, val2: any): any {
    return isUndefined(val2) ? val1 : val2
}

// 只接受自定义配置合并策略
function fromVal2Strat(val1: any, val2: any):any {
    if (!isUndefined(val2)) {
        return val2
    }
}

const stratKeysFromVal2 =  ['url' ,'data', 'params']

stratKeysFromVal2.forEach(item => {
    strats[item] = fromVal2Strat 
})


function deepMergeStrat(val1:any, val2: any):any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (!isUndefined(val2)) {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (!isUndefined(val1)) {
        return val1
    }
}

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat
})

export function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) : AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

    return config
}
