import { CancelExector } from "../types"

interface ResolvePromise {
    (reason: string): void
}

export class CalcelToken {
    promise: Promise<string>
    reason?: string
    constructor(exactor: CancelExector) {
        let resolvePromise: ResolvePromise
        this.promise = new Promise<string>(resolve => {
            resolvePromise = resolve
        })
        exactor(message => {
            if (this.reason) return
            this.reason = message
            resolvePromise(this.reason)
        })
    }
}