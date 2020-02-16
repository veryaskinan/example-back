import { Injectable } from '@nestjs/common'
import { RouterService as Router } from '../router/router.service'
import { RpcRequest } from './rpc.request'

@Injectable()
export class RpcService {
    constructor(
        private readonly router: Router
    ) {
    }

    async call(requestBody) {
        if (Array.isArray(requestBody)) {
            return Promise.all(requestBody.map(rpcRequestData => this.callOne(new RpcRequest(rpcRequestData))))
        } else {
            return await this.callOne(new RpcRequest(requestBody))
        }
    }

    async callOne(rpcRequest: RpcRequest): Promise<object> {
        const method = this.router.getMethod(rpcRequest.method)
        return {
            jsonrpc: '2.0',
            result: method(rpcRequest.params),
            id: rpcRequest.id,
        }
    }
}
