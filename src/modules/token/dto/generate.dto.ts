import { IsIn } from 'class-validator';
import * as moment from 'moment';
import { TokenType } from '../token-type.enum';

export class GenerateTokenDto {
    accountId: number;

    expires: moment.Moment;

    secret: string;

    @IsIn([TokenType.REFRESH_TOKEN, TokenType.RESET_PASSWORD])
    type: TokenType;
}
