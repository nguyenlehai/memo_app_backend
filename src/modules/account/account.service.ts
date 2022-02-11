import { ConflictException, Headers, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { AccountDto } from './dto/account.dto';
import { AccountsFilterDto } from './dto/accounts-filter.dto';
import jwt = require('jsonwebtoken');

import * as config from 'config';
import { CompanyRepository } from '../company/company.repository';
import { CreateAccountDto } from './dto/create.dto';
import { TokenService } from '../token/token.service';
import { plainToClass } from 'class-transformer';

const jwtConfig = config.get('JWT');
@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountRepository) private accountRepository: AccountRepository,
        @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository,
        private tokenService: TokenService
    ) {}

    async getAccountsByFilter(@Headers() headers, accountsfilterDto: AccountsFilterDto): Promise<any> {
        const { authorization } = headers;

        const hasTokenAndNotFilterCompanyId = authorization && !accountsfilterDto.companyId;

        if (hasTokenAndNotFilterCompanyId) {
            const accessToken = authorization.split(' ')[1];
            const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);
            accountsfilterDto.companyId = payload.sub['companyId'];
        }

        return {
            accounts: await this.accountRepository.getAccountsByFilter(accountsfilterDto),
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }

    async getAccountById(accountId: number): Promise<AccountDto> {
        return this.accountRepository.getAccountById(accountId);
    }

    async createAccount(createAccountDto: CreateAccountDto): Promise<any> {
        const isValidCompany = await this.companyRepository.findOne({ companyId: createAccountDto.companyId });
        if (!isValidCompany) {
            return {
                message: 'VALID_COMPANY',
                status: HttpStatus.NOT_FOUND,
            };
        }

        const isValidAccount = await this.accountRepository.findOne({ username: createAccountDto.username });
        if (isValidAccount) {
            return {
                message: 'VALID_USERNAME',
                status: HttpStatus.NOT_FOUND,
            };
        }

        const account = await this.accountRepository.createAccount(createAccountDto);

        const tokens = await this.tokenService.generateAuthTokens(account.id, account.companyId);

        return {
            account: plainToClass(AccountDto, account),
            tokens: tokens,
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }
}
