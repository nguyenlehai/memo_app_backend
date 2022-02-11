import { TokenType } from '../token-type.enum';
export declare class TokenDto {
    accountId: number;
    token: string;
    expires: Date;
    type: TokenType;
}
