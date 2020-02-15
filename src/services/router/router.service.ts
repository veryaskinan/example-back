import { Injectable } from '@nestjs/common';
import { AuthService } from "../../domain/auth/auth.service";

const routes = {
    'register': "auth:register",
    'sign in': "auth:signIn",
};

@Injectable()
export class RouterService {

    private routes;

    constructor(
        private readonly authService: AuthService,
    ) {
        this.routes = routes;
    }

    getMethod(rpcMethodName) {
        const routerString = this.routes[rpcMethodName]
        const [servicePrefix, methodName] = routerString.split(':')
        const method = this[`${servicePrefix}Service`][methodName]
        return method
    }
}
