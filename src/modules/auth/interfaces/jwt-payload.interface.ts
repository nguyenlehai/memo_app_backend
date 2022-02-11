import { TokenType } from 'src/modules/token/token-type.enum';

export interface JwtPayload {
    sub: {
        accountId: number;
        companyId: string;
    };
    iat: number;
    exp: number;
    type: TokenType;
}
