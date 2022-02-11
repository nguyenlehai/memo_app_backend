import { AccountRepository } from './account.repository';
import { AccountDto } from './dto/account.dto';
import { AccountsFilterDto } from './dto/accounts-filter.dto';
import { CompanyRepository } from '../company/company.repository';
import { CreateAccountDto } from './dto/create.dto';
import { TokenService } from '../token/token.service';
export declare class AccountService {
    private accountRepository;
    private companyRepository;
    private tokenService;
    constructor(accountRepository: AccountRepository, companyRepository: CompanyRepository, tokenService: TokenService);
    getAccountsByFilter(headers: any, accountsfilterDto: AccountsFilterDto): Promise<any>;
    getAccountById(accountId: number): Promise<AccountDto>;
    createAccount(createAccountDto: CreateAccountDto): Promise<any>;
}
