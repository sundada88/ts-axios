import { InterceptorManager } from "../core/InterceptorManager"

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // 对于一个 ajax 请求的 `response` 我们指定他的响应的数据类型， 通过设置 `XMLHttpRequest` 对象的 `responseType`
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  [propName: string]: any
}

// xhr 返回信息类型
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  // 响应头
  headers: any
  // 请求配置
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError?: boolean
}

export interface Axios {

  defaults: AxiosRequestConfig

  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
                                                             
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
                                                             
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
                                                             
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
                                                             
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
                                                             
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
                                                             
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}                                                            
export interface AxiosInstance extends Axios {               
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}


export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}