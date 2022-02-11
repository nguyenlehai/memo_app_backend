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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const account_service_1 = require("./account.service");
const accounts_filter_dto_1 = require("./dto/accounts-filter.dto");
const create_dto_1 = require("./dto/create.dto");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    getAccountsByFilter(headers, accountsfilterDto) {
        return this.accountService.getAccountsByFilter(headers, accountsfilterDto);
    }
    createAccount(createAccountDto) {
        return this.accountService.createAccount(createAccountDto);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Get('/'),
    __param(0, common_1.Headers()), __param(1, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, accounts_filter_dto_1.AccountsFilterDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountsByFilter", null);
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccount", null);
AccountController = __decorate([
    common_1.Controller('accounts'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map