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

    validationErrors: Array<{}>

    constructor(rpcRequestData) {
        this.jsonrpc = rpcRequestData.jsonrpc
        this.id = rpcRequestData.id
        this.method = rpcRequestData.method
        this.params = rpcRequestData.params
    }

    static async build(rpcRequestData): Promise<RpcRequest> {
        const rpcRequest = new RpcRequest(rpcRequestData)
        rpcRequest.validate()
        return rpcRequest
    }

    async validate() {
        const validationErrors = await validate(this)
        this.validationErrors = validationErrors.map(validationErrors => ({
            property: validationErrors.property,
            constraints: validationErrors.constraints
        }))
    }
}
