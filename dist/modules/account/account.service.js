"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_repository_1 = require("./account.repository");
const account_dto_1 = require("./dto/account.dto");
const accounts_filter_dto_1 = require("./dto/accounts-filter.dto");
const jwt = require("jsonwebtoken");
const config = require("config");
const company_repository_1 = require("../company/company.repository");
const token_service_1 = require("../token/token.service");
const class_transformer_1 = require("class-transformer");
const jwtConfig = config.get('JWT');
let AccountService = class AccountService {
    constructor(accountRepository, companyRepository, tokenService) {
        this.accountRepository = accountRepository;
        this.companyRepository = companyRepository;
        this.tokenService = tokenService;
    }
    async getAccountsByFilter(headers, accountsfilterDto) {
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
            status: common_1.HttpStatus.OK,
        };
    }
    async getAccountById(accountId) {
        return this.accountRepository.getAccountById(accountId);
    }
    async createAccount(createAccountDto) {
        const isValidCompany = await this.companyRepository.findOne({ companyId: createAccountDto.companyId });
        if (!isValidCompany) {
            return {
                message: 'VALID_COMPANY',
                status: common_1.HttpStatus.NOT_FOUND,
            };
        }
        const isValidAccount = await this.accountRepository.findOne({ username: createAccountDto.username });
        if (isValidAccount) {
            return {
                message: 'VALID_USERNAME',
                status: common_1.HttpStatus.NOT_FOUND,
            };
        }
        const account = await this.accountRepository.createAccount(createAccountDto);
        const tokens = await this.tokenService.generateAuthTokens(account.id, account.companyId);
        return {
            account: class_transformer_1.plainToClass(account_dto_1.AccountDto, account),
            tokens: tokens,
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, accounts_filter_dto_1.AccountsFilterDto]),
    __metadata("design:returntype", Promise)
], AccountService.prototype, "getAccountsByFilter", null);
AccountService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_repository_1.AccountRepository)),
    __param(1, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository,
        company_repository_1.CompanyRepository,
        token_service_1.TokenService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map