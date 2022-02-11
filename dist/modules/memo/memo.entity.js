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
exports.MemoEntity = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const customer_entity_1 = require("../customer/customer.entity");
let MemoEntity = class MemoEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], MemoEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Index("customerId"),
    typeorm_1.Column({ length: 64, type: 'varchar' }),
    __metadata("design:type", String)
], MemoEntity.prototype, "customerId", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], MemoEntity.prototype, "memo", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], MemoEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], MemoEntity.prototype, "deletedBy", void 0);
__decorate([
    typeorm_1.Index("createdBy"),
    typeorm_1.Column({ type: 'int' }),
    __metadata("design:type", Number)
], MemoEntity.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], MemoEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Index("updatedAt"),
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], MemoEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => account_entity_1.AccountEntity, account => account.memos),
    typeorm_1.JoinColumn({
        name: 'createdBy',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", account_entity_1.AccountEntity)
], MemoEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.ManyToOne(type => customer_entity_1.CustomerEntity, customer => customer.memos),
    typeorm_1.JoinColumn({
        name: 'customerId',
        referencedColumnName: 'customerId',
    }),
    __metadata("design:type", customer_entity_1.CustomerEntity)
], MemoEntity.prototype, "customer", void 0);
MemoEntity = __decorate([
    typeorm_1.Entity({
        name: 'memo',
    }),
    typeorm_1.Index(["customerId", "memo"], { fulltext: true, parser: 'mecab' })
], MemoEntity);
exports.MemoEntity = MemoEntity;
//# sourceMappingURL=memo.entity.js.map