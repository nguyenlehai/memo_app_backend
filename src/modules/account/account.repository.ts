import { HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';
import { AccountsFilterDto } from './dto/accounts-filter.dto';
import { CreateAccountDto } from './dto/create.dto';

import * as bcrypt from 'bcryptjs';

import * as config from 'config';

const jwtConfig = config.get('JWT');
@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {
    private logger = new Logger('AccountRepository');

    async getAccountsByFilter(accountsfilterDto: AccountsFilterDto): Promise<AccountDto[]> {
        const { companyId, accountName, accountId } = accountsfilterDto;

        const query = this.createQueryBuilder('account');

        if (companyId) query.andWhere('account.companyId = :companyId', { companyId });

        if (accountName) query.andWhere('account.accountName = :accountName', { accountName });

        if (accountId) query.andWhere('account.id = :accountId', { accountId });

        try {
            const accounts = await query.getMany();

            return plainToClass(AccountDto, accounts);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }

    async getAccountById(accountId: number): Promise<AccountDto> {
        const account = await this.findOne({ id: accountId });
        return plainToClass(AccountDto, account);
    }

    async createAccount(createAccountDto: CreateAccountDto): Promise<AccountDto> {
        const { username, password, companyId, accountName } = createAccountDto;

        const account = new AccountEntity();

        account.username = username;

        account.companyId = companyId;

        account.accountName = accountName;

        account.password = await this.hashPassword(password, jwtConfig.SALT);

        try {
            const result = await this.save(account);

            return plainToClass(AccountDto, result);
        } catch (error) {
            this.logger.error(error.message, error.stack);

            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
