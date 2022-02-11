import { RefreshTokenDto } from './dto/refresh.dto';
import { TokenService } from './token.service';
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    refreshToken(refreshTokenDto: RefreshTokenDto): any;
}
