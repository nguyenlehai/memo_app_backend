import { TokenEntity } from '../token/token.entity';
import { MemoEntity } from '../memo/memo.entity';
import { CompanyEntity } from '../company/company.entity';
export declare class AccountEntity {
    id: number;
    username: string;
    externalAccountId: string;
    accountName: string;
    companyId: string;
    password: string;
    deletedAt: Date;
    deletedBy: number;
    createdAt: Date;
    updatedAt: Date;
    tokens: TokenEntity[];
    memos: MemoEntity[];
    company: CompanyEntity;
    validatePassword(password: string): Promise<boolean>;
}
