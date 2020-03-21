import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RouterService } from './infrastructure/services/router/router.service';
import { AuthService } from './domain/auth/auth.service';
import { RpcService } from './infrastructure/services/rpc/rpc.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RouterService, AuthService, RpcService],
})
export class AppModule {}
