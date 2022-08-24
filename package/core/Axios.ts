import { isString } from "../helpers/utils";
import {  AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectFn, ResolveFn } from "../types";
import dispatchRequest from "./dispatchRequest";
import { InterceptorManager } from "./InterceptorManager";

export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolveFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected: RejectFn | undefined
}

export class Axios {
    interceptors: Interceptors
    constructor() {
      this.interceptors = {
        request: new InterceptorManager<AxiosRequestConfig>(),
        response: new InterceptorManager<AxiosResponse>()
      }
    }
    request(url: any, config?: any): AxiosPromise {
        if (isString(url)) {
          if (!config) config = {}
          config.url = url
          config.method = 'get'
        } else {
          config = url
        }
        const chain: PromiseChain[] = [
          {
            resolved: dispatchRequest,
            rejected: undefined
          }
        ]
        this.interceptors.request.forEach(interceptor => {
          chain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor => {
          chain.push(interceptor)
        })
        let promise = Promise.resolve(config)
        while(chain.length) {
          const {resolved, rejected} = chain.shift()!
          promise = promise.then(resolved, rejected)
        }
        return promise
    }
    get(url: string, config?: AxiosRequestConfig):AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
      return this._requestMethodWithoutData('delete', url, config)
    }
    
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
      return this._requestMethodWithoutData('head', url, config)
    }
    
    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
      return this._requestMethodWithoutData('options', url, config)
    }
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
      }
    
      put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
      }
    
      patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
      }
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.request(
          Object.assign(config || {}, {
            method,
            url
          })
        )
    }
    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                url,
                data
            })
        )
    }
}