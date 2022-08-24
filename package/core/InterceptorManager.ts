import { RejectFn, ResolveFn } from "../types";

export interface Interceptor<T> {
    resolved: ResolveFn<T>
    rejected: RejectFn
}
export class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>
    constructor() {
        this.interceptors = []
    }
    use(resolved: ResolveFn<T>, rejected: RejectFn): number {
        this.interceptors.push({resolved, rejected})
        return this.interceptors.length - 1
    }
    forEach(fn:(interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor)
            }
        })

    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null
        }
    }
}