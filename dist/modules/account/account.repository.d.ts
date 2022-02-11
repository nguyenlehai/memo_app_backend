import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';
import { AccountsFilterDto } from './dto/accounts-filter.dto';
import { CreateAccountDto } from './dto/create.dto';
export declare class AccountRepository extends Repository<AccountEntity> {
    private logger;
    getAccountsByFilter(accountsfilterDto: AccountsFilterDto): Promise<AccountDto[]>;
    getAccountById(accountId: number): Promise<AccountDto>;
    createAccount(createAccountDto: CreateAccountDto): Promise<AccountDto>;
    private hashPassword;
}
