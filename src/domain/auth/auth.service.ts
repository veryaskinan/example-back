import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
    register() {
        return 'registered'
    }
    signIn() {
        return 'signed in, thank you'
    }
}
