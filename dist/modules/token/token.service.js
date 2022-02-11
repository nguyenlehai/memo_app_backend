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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const token_repository_1 = require("./token.repository");
const token_dto_1 = require("./dto/token.dto");
const moment = require("moment");
const config = require("config");
const token_type_enum_1 = require("./token-type.enum");
const token_entity_1 = require("./token.entity");
const class_transformer_1 = require("class-transformer");
const account_repository_1 = require("../account/account.repository");
const typeorm_1 = require("typeorm");
const jwtConfig = config.get('JWT');
let TokenService = class TokenService {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger('TokenService');
        this.tokenRepository = this.connection.getCustomRepository(token_repository_1.TokenRepository);
        this.accountRepository = this.connection.getCustomRepository(account_repository_1.AccountRepository);
    }
    async refreshToken(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        const refreshTokenDoc = await this.verifyToken(refreshToken, token_type_enum_1.TokenType.REFRESH_TOKEN);
        const account = await this.accountRepository.findOne({ id: refreshTokenDoc.accountId });
        if (!account)
            throw new common_1.NotFoundException({ message: 'NOT_FOUND_ACCOUNT', status: common_1.HttpStatus.NOT_FOUND });
        await this.tokenRepository.remove(refreshTokenDoc);
        const tokens = await this.generateAuthTokens(account.id, account.companyId);
        return { tokens, message: 'SUCCESS', status: common_1.HttpStatus.OK };
    }
    async verifyToken(token, type) {
        try {
            const payload = jwt.verify(token, jwtConfig.SECRET_KEY);
            const tokenDoc = await this.tokenRepository.findOne({
                where: {
                    token,
                    type,
                    accountId: payload.sub['accountId'],
                },
            });
            if (!tokenDoc)
                throw new common_1.NotFoundException({ message: 'NOT_FOUND_TOKEN', status: common_1.HttpStatus.NOT_FOUND });
            return tokenDoc;
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.NotFoundException({ message: 'NOT_FOUND_TOKEN', status: common_1.HttpStatus.NOT_FOUND });
        }
    }
    async generateAuthTokens(accountId, companyId) {
        const accessTokenExpires = moment().add(jwtConfig.ACCESS_TOKEN_EXPIRATION_DAYS, 'days');
        const accessToken = this.generateToken(accountId, companyId, accessTokenExpires, token_type_enum_1.TokenType.ACCESS_TOKEN, jwtConfig.SECRET_KEY);
        const refreshTokenExpires = moment().add(jwtConfig.REFRESH_TOKEN_EXPIRATION_DAYS, 'days');
        const refreshToken = this.generateToken(accountId, companyId, refreshTokenExpires, token_type_enum_1.TokenType.REFRESH_TOKEN, jwtConfig.SECRET_KEY);
        await this.saveToken(accountId, refreshToken, refreshTokenExpires, token_type_enum_1.TokenType.REFRESH_TOKEN);
        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
        };
    }
    generateToken(accountId, companyId, expires, type, secret) {
        const payload = {
            sub: {
                accountId,
                companyId,
            },
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        };
        return jwt.sign(payload, secret);
    }
    async saveToken(accountId, token, expires, type) {
        const tokenEntity = new token_entity_1.TokenEntity();
        tokenEntity.accountId = accountId;
        tokenEntity.token = token;
        tokenEntity.expires = expires.toDate();
        tokenEntity.type = type;
        try {
            const result = await this.tokenRepository.save(tokenEntity);
            return class_transformer_1.plainToClass(token_dto_1.TokenDto, result);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR_SAVE_TOKEN', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
};
TokenService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map