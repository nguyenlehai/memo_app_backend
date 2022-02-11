import { RefreshTokenDto } from './dto/refresh.dto';
import { TokenDto } from './dto/token.dto';
import { TokensDto } from './dto/tokens.dto';
import moment = require('moment');
import { TokenType } from './token-type.enum';
import { TokenEntity } from './token.entity';
import { Connection } from 'typeorm';
export declare class TokenService {
    private readonly connection;
    private logger;
    private tokenRepository;
    private accountRepository;
    constructor(connection: Connection);
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any>;
    verifyToken(token: string, type: TokenType): Promise<TokenEntity>;
    generateAuthTokens(accountId: number, companyId: string): Promise<TokensDto>;
    generateToken(accountId: number, companyId: string, expires: moment.Moment, type: string, secret: string): string;
    error: any;
    saveToken(accountId: number, token: string, expires: moment.Moment, type: TokenType): Promise<TokenDto>;
}
