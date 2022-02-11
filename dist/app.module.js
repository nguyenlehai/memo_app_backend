"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const typeOrmConfig = require("./database/config/typeorm.config");
const nest_winston_1 = require("nest-winston");
const app_logging_1 = require("./app.logging");
const token_module_1 = require("./modules/token/token.module");
const account_module_1 = require("./modules/account/account.module");
const company_module_1 = require("./modules/company/company.module");
const customer_module_1 = require("./modules/customer/customer.module");
const memo_module_1 = require("./modules/memo/memo.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            token_module_1.TokenModule,
            account_module_1.AccountModule,
            company_module_1.CompanyModule,
            customer_module_1.CustomerModule,
            memo_module_1.MemoModule,
            typeorm_1.TypeOrmModule.forRoot(typeOrmConfig),
            nest_winston_1.WinstonModule.forRoot(app_logging_1.winstonOptions),
        ],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map