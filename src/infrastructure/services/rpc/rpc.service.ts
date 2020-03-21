import { Injectable } from '@nestjs/common'
import { RouterService as Router } from '../router/router.service'
import { RpcRequest } from './rpc.request'
import { RequestError, MethodError, ParamsError, MethodResult } from '../../applicationObjects'

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
        const rpcRequest = await RpcRequest.build(rpcRequestData)
        if (rpcRequest.validationErrors.length) {
            return {
                jsonrpc: '2.0',
                error: new RequestError(rpcRequest.validationErrors),
                id: rpcRequest.id,
            }
        }
        const method = this.router.getMethod(rpcRequest.method)
        if (method === false) {
            return {
                jsonrpc: '2.0',
                error: new MethodError(rpcRequest.method),
                id: rpcRequest.id,
            }
        }
        const result = await method(rpcRequest.params)
        return {
            jsonrpc: '2.0',
            result: result instanceof MethodResult ? result : undefined,
            error: result instanceof ParamsError ? result : undefined,
            id: rpcRequest.id,
        }
    }
}
