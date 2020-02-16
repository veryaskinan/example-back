import {Controller, Post, Req, Header} from '@nestjs/common'
import { Request } from 'express'
import { AppService } from './app.service'
import { RpcService } from './services/rpc/rpc.service'

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly rpcService: RpcService,
  ) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async index(@Req() request: Request): Promise<object> {
    await this.rpcService.validateRequest(request)
    return this.rpcService.call(request.body)
  }
}
