import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterService } from './services/router/router.service';
import { AuthService } from './domain/auth/auth.service';
import { RpcService } from './services/rpc/rpc.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RouterService, AuthService, RpcService],
})
export class AppModule {}
