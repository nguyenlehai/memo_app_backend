import { Repository } from 'typeorm';
import { AccountEntity } from '../entities/AccountEntity';
interface LOGIN_FORM {
    account_id: string;
    password: string;
}
export declare class AccountService {
    private readonly accountRepository;
    constructor(accountRepository: Repository<AccountEntity>);
    findAll(): Promise<AccountEntity[]>;
    validateCredentials(body: LOGIN_FORM, account: AccountEntity): Promise<boolean>;
    find(id: number): Promise<AccountEntity>;
    findByCompanyId(company_id: string): Promise<AccountEntity>;
    findByAccountId(account_id: string): Promise<AccountEntity>;
    create(company_id: string, account_id: string, password: string): Promise<AccountEntity>;
    hashPassword(plain: string): Promise<string>;
}
export {};
