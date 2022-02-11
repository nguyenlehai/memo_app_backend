import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { AccountEntity } from '../entities/AccountEntity';
export interface RefreshTokenPayload {
    account_id: string;
    audience: string;
}
export declare class TokensService {
    private readonly accountService;
    private readonly jwt;
    constructor(account: AccountService, jwt: JwtService);
    generateAccessToken(account: AccountEntity): Promise<string>;
    generateRefreshToken(user: AccountEntity, expiresIn: number): Promise<string>;
    resolveRefreshToken(encoded: string): Promise<{
        user: AccountEntity;
        payload: RefreshTokenPayload;
    }>;
    createAccessTokenFromRefreshToken(refresh: string): Promise<{
        token: string;
        user: AccountEntity;
    }>;
    private decodeRefreshToken;
    private getUserFromRefreshTokenPayload;
}
