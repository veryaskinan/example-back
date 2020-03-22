import { Injectable } from '@nestjs/common'
import { RegisterParams } from './auth.params'
import { ParamsError } from '../../infrastructure/applicationObjects/errors/params.error'
import { MethodResult } from '../../infrastructure/applicationObjects/results/method.result'

@Injectable()
export class AuthService {
    async register(credentials) {
        const registerParams = await RegisterParams.build(credentials)
        if (registerParams.validationErrors.length > 0) {
            return new ParamsError(registerParams.validationErrors)
        }
        return new MethodResult({
            accessToken: registerParams.email,
            refreshToken: registerParams.password
        })
    }
    signIn(credential) {
        return {
            accessToken: credential.email,
            refreshToken: credential.password
        }
    }
}
