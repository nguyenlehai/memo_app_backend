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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const account_service_1 = require("../account/account.service");
let TokensService = class TokensService {
    constructor(account, jwt) {
        this.jwt = jwt;
    }
    async generateAccessToken(account) {
        const opts = {
            subject: String(account.id),
            audience: 'access_token',
        };
        return this.jwt.signAsync({}, opts);
    }
    async generateRefreshToken(user, expiresIn) {
        const opts = {
            expiresIn,
            subject: String(user.id),
            audience: 'refresh_token',
        };
        return this.jwt.signAsync({}, opts);
    }
    async resolveRefreshToken(encoded) {
        const payload = await this.decodeRefreshToken(encoded);
        if (payload.audience !== 'refresh_token') {
            throw new common_1.UnprocessableEntityException('Refresh token not found');
        }
        const user = await this.getUserFromRefreshTokenPayload(payload);
        if (!user) {
            throw new common_1.UnprocessableEntityException('Refresh token malformed');
        }
        return { user, payload };
    }
    async createAccessTokenFromRefreshToken(refresh) {
        const { user } = await this.resolveRefreshToken(refresh);
        const token = await this.generateAccessToken(user);
        return { user, token };
    }
    async decodeRefreshToken(token) {
        try {
            return this.jwt.verifyAsync(token);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.UnprocessableEntityException('Refresh token expired');
            }
            else {
                throw new common_1.UnprocessableEntityException('Refresh token malformed');
            }
        }
    }
    async getUserFromRefreshTokenPayload(payload) {
        const account_id = payload.account_id;
        if (!account_id) {
            throw new common_1.UnprocessableEntityException('Refresh token malformed');
        }
        return this.accountService.findByAccountId(account_id);
    }
};
TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_service_1.AccountService, jwt_1.JwtService])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map