"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const account_entity_1 = require("./account.entity");
const account_dto_1 = require("./dto/account.dto");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwtConfig = config.get('JWT');
let AccountRepository = class AccountRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('AccountRepository');
    }
    async getAccountsByFilter(accountsfilterDto) {
        const { companyId, accountName, accountId } = accountsfilterDto;
        const query = this.createQueryBuilder('account');
        if (companyId)
            query.andWhere('account.companyId = :companyId', { companyId });
        if (accountName)
            query.andWhere('account.accountName = :accountName', { accountName });
        if (accountId)
            query.andWhere('account.id = :accountId', { accountId });
        try {
            const accounts = await query.getMany();
            return class_transformer_1.plainToClass(account_dto_1.AccountDto, accounts);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
    async getAccountById(accountId) {
        const account = await this.findOne({ id: accountId });
        return class_transformer_1.plainToClass(account_dto_1.AccountDto, account);
    }
    async createAccount(createAccountDto) {
        const { username, password, companyId, accountName } = createAccountDto;
        const account = new account_entity_1.AccountEntity();
        account.username = username;
        account.companyId = companyId;
        account.accountName = accountName;
        account.password = await this.hashPassword(password, jwtConfig.SALT);
        try {
            const result = await this.save(account);
            return class_transformer_1.plainToClass(account_dto_1.AccountDto, result);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
AccountRepository = __decorate([
    typeorm_1.EntityRepository(account_entity_1.AccountEntity)
], AccountRepository);
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=account.repository.js.map