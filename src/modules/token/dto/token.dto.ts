import { IsDefined, IsIn, IsString } from 'class-validator';
import { TokenType } from '../token-type.enum';

export class TokenDto {
    @IsDefined()
    @IsString()
    accountId: number;

    @IsDefined()
    @IsString()
    token: string;

    @IsDefined()
    @IsString()
    expires: Date;

    @IsIn([TokenType.REFRESH_TOKEN, TokenType.RESET_PASSWORD])
    type: TokenType;
}
