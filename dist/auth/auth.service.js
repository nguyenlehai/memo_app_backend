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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const account_service_1 = require("../account/account.service");
const tokens_service_1 = require("./tokens.service");
const company_service_1 = require("../company/company.service");
let AuthService = class AuthService {
    constructor(accountService, companyService, jwtService, tokens) {
        this.accountService = accountService;
        this.companyService = companyService;
        this.jwtService = jwtService;
        this.tokens = tokens;
    }
    async signUp(body) {
        const { company_id, account_id, password } = body;
        const existingCompany = await this.accountService.findByCompanyId(company_id);
        const existingAccount = await this.accountService.findByAccountId(account_id);
        if (!existingAccount && existingCompany) {
            const account = await this.accountService.create(company_id, account_id, password);
            delete account.password;
            return {
                status: 'success',
                data: account,
            };
        }
        else if (!existingAccount &&
            !existingCompany &&
            company_id.includes('cmc')) {
            await this.companyService.create(company_id);
            const account = await this.accountService.create(company_id, account_id, password);
            delete account.password;
            return {
                status: 'success',
                data: account,
            };
        }
        else {
            throw new common_1.BadRequestException('account exists or company not exists');
        }
    }
    async login(body) {
        const { account_id, password } = body;
        const account = await this.accountService.findByAccountId(account_id);
        const valid = account
            ? await this.accountService.validateCredentials(body, account)
            : false;
        if (!valid) {
            throw new common_1.UnauthorizedException('Username or password is invalid');
        }
        const token = await this.tokens.generateAccessToken(account);
        const refresh = await this.tokens.generateRefreshToken(account, 60 * 60 * 24 * 30);
        const payload = this.buildResponsePayload(account, token, refresh);
        delete payload.account.password;
        return {
            status: 'success',
            data: payload,
        };
    }
    buildResponsePayload(account, accessToken, refreshToken) {
        return {
            account: account,
            payload: Object.assign({ type: 'bearer', token: accessToken }, (refreshToken ? { refresh_token: refreshToken } : {})),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        company_service_1.CompanyService,
        jwt_1.JwtService,
        tokens_service_1.TokensService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map