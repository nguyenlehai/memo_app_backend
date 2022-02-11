import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { AccountEntity } from '../entities/AccountEntity';
import { TokensService } from './tokens.service';
import { AuthenticationPayload } from './auth.controller';
import { CompanyService } from '../company/company.service';
export interface LOGIN_FORM {
    account_id: string;
    password: string;
}
export interface SIGNUP_FORM {
    company_id: string;
    account_id: string;
    password: string;
}
export declare class AuthService {
    private readonly accountService;
    private readonly companyService;
    private readonly jwtService;
    private readonly tokens;
    constructor(accountService: AccountService, companyService: CompanyService, jwtService: JwtService, tokens: TokensService);
    signUp(body: SIGNUP_FORM): Promise<{
        status: string;
        data: AccountEntity;
    }>;
    login(body: LOGIN_FORM): Promise<{
        status: string;
        data: AuthenticationPayload;
    }>;
    private buildResponsePayload;
}
