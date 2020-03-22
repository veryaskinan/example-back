import { Controller, Post, Req, Header } from '@nestjs/common'
import { Request } from 'express'
import { RpcService } from './infrastructure/services/rpc/rpc.service'

@Controller()
export class AppController {
    constructor(
        private readonly rpcService: RpcService,
    ) {}

    @Post()
    async index(@Req() request: Request): Promise<object> {
        return this.rpcService.call(request.body)
    }
}
