import {Controller, Post, Req} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { RouterService } from './services/router/router.service';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly routerService: RouterService,
  ) {}

  @Post()
  index(@Req() request: Request): string {
    // check input (format validation)
    // get route
    const method  = this.routerService.getMethod(request.body.method);
    // call method
    // return result
    return method(request.body.params);
  }
}
