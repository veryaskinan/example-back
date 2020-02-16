import { IsInt, Equals, IsString, IsObject, IsDefined, validate } from 'class-validator';

export class RpcRequest {
    @IsDefined()
    @IsInt()
    id: number

    @Equals('2.0')
    jsonrpc: string

    @IsString()
    method: string

    @IsObject()
    params: object

    constructor(rpcRequestData) {
        this.jsonrpc = rpcRequestData.jsonrpc
        this.id = rpcRequestData.id
        this.method = rpcRequestData.method
        this.params = rpcRequestData.params
        validate(this).then(error => console.log('validation error', error))
    }
}
