import { Injectable } from '@nestjs/common'
import { RouterService as Router } from '../router/router.service'
import { RpcRequest } from './rpc.request'
import { RequestError, MethodError } from './errors'
import { RequestResult } from './results'

@Injectable()
export class RpcService {
    constructor(
        private readonly router: Router
    ) {
    }

    async call(requestBody) {
        if (Array.isArray(requestBody)) {
            return Promise.all(requestBody.map(rpcRequestData => this.callOne(rpcRequestData)))
        } else {
            return await this.callOne(requestBody)
        }
    }

    async callOne(rpcRequestData: any): Promise<object> {
        // build rpc request object
        const rpcRequest = await RpcRequest.build(rpcRequestData)
        // check rpc request validation
        if (rpcRequest.validationErrors.length) {
            return new RequestResult(rpcRequest.id, new RequestError(rpcRequest.validationErrors))
        }
        // find rpc method
        const method = this.router.getMethod(rpcRequest.method)
        if (method === false) {
            return new RequestResult(rpcRequest.id, new MethodError(rpcRequest.method))
        }
        // call method and return result(error)
        return new RequestResult(rpcRequest.id, await method(rpcRequest.params))
    }
}
