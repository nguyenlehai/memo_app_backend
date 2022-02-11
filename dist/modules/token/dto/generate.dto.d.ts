import * as moment from 'moment';
import { TokenType } from '../token-type.enum';
export declare class GenerateTokenDto {
    accountId: number;
    expires: moment.Moment;
    secret: string;
    type: TokenType;
}
