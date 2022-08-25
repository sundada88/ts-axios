import { deepMerge, isPlainObject, isUndefined } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";
const strats = {}

function defaultStrat(val1: any, val2: any) {
    return isUndefined(val2) ? val1 : val2
}

function fromVal2Strat(val1: any, val2: any) {
    if (!isUndefined(val2)) return val2
}

function deepMergeStrat(val1: any, val2: any) {
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

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
    strats[key] = fromVal2Strat
})


const stratKeysDeepMerge = ['common']
stratKeysDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat
})

export function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig):AxiosRequestConfig {
    if (!config2) config2 = {}

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