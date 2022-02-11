import { TokenType } from '../token-type.enum';
export declare class CreateTokenDto {
    accountId: number;
    token: string;
    expires: Date;
    type: TokenType;
}
