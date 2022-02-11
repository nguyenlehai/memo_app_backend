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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const account_entity_1 = require("../../account/account.entity");
const account_dto_1 = require("../../account/dto/account.dto");
const token_service_1 = require("../../token/token.service");
const auth_repository_1 = require("../repositories/auth.repository");
let AuthService = class AuthService {
    constructor(authRepository, tokenService) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
        this.logger = new common_1.Logger('AuthService');
    }
    async signIn(signInDto) {
        const account = await this.authRepository.validateUserPassword(signInDto);
        if (!account)
            throw new common_1.NotFoundException({ message: 'NOT_FOUND_ACCOUNT', status: common_1.HttpStatus.NOT_FOUND });
        const tokens = await this.tokenService.generateAuthTokens(account.id, account.companyId);
        return {
            account: class_transformer_1.plainToClass(account_dto_1.AccountDto, account),
            tokens: tokens,
            status: common_1.HttpStatus.OK,
            message: 'SUCCESS',
        };
    }
    getAuthenticatedUser(account) {
        return class_transformer_1.plainToClass(account_dto_1.AccountDto, account);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(auth_repository_1.AuthRepository)),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository, token_service_1.TokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map