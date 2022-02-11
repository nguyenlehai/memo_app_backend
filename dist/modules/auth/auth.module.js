"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const auth_repository_1 = require("./repositories/auth.repository");
const config = require("config");
const passport_1 = require("@nestjs/passport");
const token_service_1 = require("../token/token.service");
const account_service_1 = require("../account/account.service");
const account_repository_1 = require("../account/account.repository");
const company_repository_1 = require("../company/company.repository");
const jwtConfig = config.get('JWT');
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: jwtConfig.SECRET_KEY,
                signOptions: {
                    expiresIn: `${jwtConfig.ACCESS_TOKEN_EXPIRATION_DAY}d`,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([auth_repository_1.AuthRepository, account_repository_1.AccountRepository, company_repository_1.CompanyRepository]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [account_service_1.AccountService, auth_service_1.AuthService, token_service_1.TokenService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map