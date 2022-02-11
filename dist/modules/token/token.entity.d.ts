import { TokenType } from './token-type.enum';
import { AccountEntity } from '../account/account.entity';
export declare class TokenEntity {
    id: number;
    accountId: number;
    token: string;
    expires: Date;
    type: TokenType;
    createdAt: Date;
    updatedAt: Date;
    account: AccountEntity;
}
