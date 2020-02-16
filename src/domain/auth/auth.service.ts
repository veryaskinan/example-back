import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
    register() {
        return 'registered'
    }
    signIn(credential) {
        return {
            accessToken: credential.login,
            refreshToken: credential.password
        }
    }
}
