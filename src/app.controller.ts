import { Controller, Post, Req, Header, UseFilters, HttpCode } from '@nestjs/common'
import { Request } from 'express'
import { RpcService } from './infrastructure/services/rpc/rpc.service'
import { ErrorFilter } from './infrastructure/exceptionFilters/common.error.filter'

@Controller()
export class AppController {
    constructor(
        private readonly rpcService: RpcService,
    ) {}

    @Post()
    @HttpCode(200)
    @UseFilters(ErrorFilter)
    @Header('Content-Type', 'application/json')
    async index(@Req() request: Request): Promise<object> {
        return this.rpcService.call(request.body)
    }
}
