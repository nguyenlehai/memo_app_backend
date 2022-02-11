import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService) {}

    @Post('/refresh')
    refreshToken(@Body(ValidationPipe) refreshTokenDto: RefreshTokenDto): any {
        return this.tokenService.refreshToken(refreshTokenDto);
    }
}
