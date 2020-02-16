import { Injectable } from '@nestjs/common'
import { RouterService as Router } from '../router/router.service'

@Injectable()
export class RpcService {
    constructor(
        private readonly router: Router
    ) {
    }

    validateRequest(requestBody) {
        return null
    }

    async call(requestBody) {
        if (Array.isArray(requestBody)) {
            return Promise.all(requestBody.map(rpcRequest => this.callOne(rpcRequest)))
        } else {
            return await this.callOne(requestBody)
        }
    }

    async callOne(rpcRequest): Promise<object> {
        const method = this.router.getMethod(rpcRequest.method)
        return {
            jsonrpc: '2.0',
            result: method(rpcRequest.params),
            id: rpcRequest.id,
        }
    }
}
