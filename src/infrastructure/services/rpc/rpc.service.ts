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
            const requestResults = await Promise.all(requestBody.map(rpcRequestData => this.callOne(rpcRequestData)))
            return requestResults.filter(requestResult => requestResult)
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
        const result = await method(rpcRequest.params)
        if (rpcRequest.id) {
            return new RequestResult(rpcRequest.id, result)
        }
    }
}
