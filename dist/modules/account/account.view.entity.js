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
exports.CandidateAccount = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("./account.entity");
let CandidateAccount = class CandidateAccount {
};
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Number)
], CandidateAccount.prototype, "id", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateAccount.prototype, "internalAccountId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateAccount.prototype, "accountId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateAccount.prototype, "accountName", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateAccount.prototype, "password", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateAccount.prototype, "companyId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateAccount.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateAccount.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateAccount.prototype, "updatedAt", void 0);
CandidateAccount = __decorate([
    typeorm_1.ViewEntity({
        expression: (connection) => connection
            .createQueryBuilder()
            .addSelect('account.id', 'id')
            .addSelect('account.username', 'internalAccountId')
            .addSelect('account.externalAccountId', 'accountId')
            .addSelect('account.accountName', 'accountName')
            .addSelect('account.password', 'password')
            .addSelect('account.companyId', 'companyId')
            .addSelect('account.deletedAt', 'deletedAt')
            .addSelect('account.createdAt', 'createdAt')
            .addSelect('account.updatedAt', 'updatedAt')
            .from(account_entity_1.AccountEntity, 'account'),
    })
], CandidateAccount);
exports.CandidateAccount = CandidateAccount;
//# sourceMappingURL=account.view.entity.js.map