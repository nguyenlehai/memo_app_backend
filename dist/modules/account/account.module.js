"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const account_controller_1 = require("./account.controller");
const account_repository_1 = require("./account.repository");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const company_repository_1 = require("../company/company.repository");
const token_service_1 = require("../token/token.service");
let AccountModule = class AccountModule {
};
AccountModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([account_repository_1.AccountRepository, company_repository_1.CompanyRepository]), auth_module_1.AuthModule],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService, token_service_1.TokenService],
        exports: [account_service_1.AccountService],
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map