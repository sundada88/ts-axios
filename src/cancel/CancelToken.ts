import { Canceler, CancelExector, CancelTokenSource } from "../types"
import  Cancel  from "./Cancel"

interface ResolvePromise {
    (reason: Cancel): void
}

export class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel
    constructor(exactor: CancelExector) {
        let resolvePromise: ResolvePromise
        this.promise = new Promise<Cancel>(resolve => {
            resolvePromise = resolve
        })
        exactor(message => {
            if (this.reason) return
            this.reason = new Cancel(message)
            resolvePromise(this.reason)
        })
    }
    static source(): CancelTokenSource {
        let cancel!: Canceler
        const token = new CancelToken(c => {
            cancel = c
        })
        return {
            cancel,
            token
        }
    }
    throwIfRequested(): void {
        if (this.reason) {
            throw this.reason
        }
    }
}