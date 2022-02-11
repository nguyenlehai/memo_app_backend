import { AccountService } from './account.service';
import { AccountsFilterDto } from './dto/accounts-filter.dto';
import { CreateAccountDto } from './dto/create.dto';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    getAccountsByFilter(headers: any, accountsfilterDto: AccountsFilterDto): Promise<any>;
    createAccount(createAccountDto: CreateAccountDto): Promise<any>;
}
