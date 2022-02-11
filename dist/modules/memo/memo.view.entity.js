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
exports.CandidateMemo = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const customer_entity_1 = require("../customer/customer.entity");
const memo_entity_1 = require("./memo.entity");
let CandidateMemo = class CandidateMemo {
};
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Number)
], CandidateMemo.prototype, "id", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "internalAccountId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "accountId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "accountName", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "companyId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "internalCustomerId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "customerId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "customerName", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateMemo.prototype, "memo", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateMemo.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateMemo.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateMemo.prototype, "createdBy", void 0);
CandidateMemo = __decorate([
    typeorm_1.ViewEntity({
        expression: (connection) => connection
            .createQueryBuilder()
            .addSelect('memo.id', 'id')
            .addSelect('account.username', 'internalAccountId')
            .addSelect('account.externalAccountId', 'accountId')
            .addSelect('account.accountName', 'accountName')
            .addSelect('account.companyId', 'companyId')
            .addSelect('memo.customerId', 'internalCustomerId')
            .addSelect('customer.externalCustomerId', 'customerId')
            .addSelect('customer.customerName', 'customerName')
            .addSelect('memo.memo', 'memo')
            .addSelect('memo.deletedAt', 'deletedAt')
            .addSelect('memo.createdAt', 'createdAt')
            .addSelect('memo.createdBy', 'createdBy')
            .from(memo_entity_1.MemoEntity, 'memo')
            .leftJoin(account_entity_1.AccountEntity, 'account', 'account.id = memo.createdBy')
            .leftJoin(customer_entity_1.CustomerEntity, 'customer', 'customer.customerId = memo.customerId'),
    })
], CandidateMemo);
exports.CandidateMemo = CandidateMemo;
//# sourceMappingURL=memo.view.entity.js.map