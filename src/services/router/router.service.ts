import { Injectable } from '@nestjs/common';

const routes = {
    'register': "auth:register"
};

@Injectable()
export class RouterService {

    private routes;

    constructor() {
        this.routes = routes;
    }

    getMethod(methodName) {
        const routerString = this.routes[methodName];
        const routerStringSplited = routerString.split(':');
    }
}
