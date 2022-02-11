import { IsDefined, IsIn, IsString } from 'class-validator';
import { TokenType } from '../token-type.enum';

export class VerifyTokenDto {
    @IsDefined()
    @IsString()
    token: string;

    @IsIn([TokenType.REFRESH_TOKEN, TokenType.RESET_PASSWORD])
    type: TokenType;
}
