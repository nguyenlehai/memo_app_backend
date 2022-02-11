import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign-in')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<any> {
        return this.authService.signIn(signInDto);
    }
}
