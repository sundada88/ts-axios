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

export interface AxiosRequestConfig  {
    url?: string
    method?: Method
    data?: any
    params?: any
    headers?: any
    responseType?: XMLHttpRequestResponseType
    timeout?: number
}

export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>>{}

export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code: string
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
    get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    post<T=any>(url: string, data?: any,  config?: AxiosRequestConfig): AxiosPromise<T>
    put<T=any>(url: string, data?: any,  config?: AxiosRequestConfig): AxiosPromise<T>
    patch<T=any>(url: string, data?: any,  config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
    <T = any>(url:string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface ResolveFn<T = any> {
    (val: T): T | Promise<T>
}

export interface RejectFn {
    (err: any): any
}

export interface AxiosInterceptorManager<T> {
    use(resolved: ResolveFn<T>, rejected?: RejectFn):  number
    eject(id: number): void
}