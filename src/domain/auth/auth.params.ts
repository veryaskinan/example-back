import { IsEmail, Length, IsString, IsDefined, validate } from 'class-validator';

class Params {
    validationErrors: Array<{}>

    async validate() {
        const validationErrors = await validate(this)
        this.validationErrors = validationErrors.map(validationErrors => ({
            property: validationErrors.property,
            constraints: validationErrors.constraints
        }))
    }
}

export class RegisterParams extends Params {
    @IsDefined()
    @IsString()
    @IsEmail()
    email: string

    @IsDefined()
    @IsString()
    @Length(6, 50)
    password: string

    constructor(registerParams) {
        super();
        this.email = registerParams.email
        this.password = registerParams.password
    }

    static async build(registerParams): Promise<RegisterParams> {
        const appRegisterParams = new RegisterParams(registerParams)
        await appRegisterParams.validate()
        return appRegisterParams;
    }
}

export class LoginParams extends Params {
    @IsDefined()
    @IsString()
    @IsEmail()
    email: string

    @IsDefined()
    @IsString()
    @Length(6, 50)
    password: string

    constructor(loginParams) {
        super()
        this.email = loginParams.email
        this.password = loginParams.password
        this.validate()
    }
}
