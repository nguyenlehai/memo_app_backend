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
exports.AccountEntity = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const token_entity_1 = require("../token/token.entity");
const memo_entity_1 = require("../memo/memo.entity");
const company_entity_1 = require("../company/company.entity");
let AccountEntity = class AccountEntity {
    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], AccountEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Index("username"),
    typeorm_1.Column({ length: 64, type: 'varchar' }),
    __metadata("design:type", String)
], AccountEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Index("externalAccountId"),
    typeorm_1.Column({ length: 64, type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "externalAccountId", void 0);
__decorate([
    typeorm_1.Column({ length: 100, type: 'varchar' }),
    __metadata("design:type", String)
], AccountEntity.prototype, "accountName", void 0);
__decorate([
    typeorm_1.Index("companyId"),
    typeorm_1.Column({ length: 64, type: 'varchar' }),
    __metadata("design:type", String)
], AccountEntity.prototype, "companyId", void 0);
__decorate([
    typeorm_1.Column({ length: 64, type: 'varchar' }),
    __metadata("design:type", String)
], AccountEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], AccountEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "deletedBy", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], AccountEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Index("updatedAt"),
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], AccountEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => token_entity_1.TokenEntity, token => token.accountId, {}),
    __metadata("design:type", Array)
], AccountEntity.prototype, "tokens", void 0);
__decorate([
    typeorm_1.OneToMany(type => memo_entity_1.MemoEntity, memo => memo.createdBy),
    __metadata("design:type", Array)
], AccountEntity.prototype, "memos", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.accounts),
    typeorm_1.JoinColumn({
        name: 'companyId',
        referencedColumnName: 'companyId',
    }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], AccountEntity.prototype, "company", void 0);
AccountEntity = __decorate([
    typeorm_1.Entity({
        name: 'account',
    }),
    typeorm_1.Index(["username", "companyId"], { unique: true })
], AccountEntity);
exports.AccountEntity = AccountEntity;
//# sourceMappingURL=account.entity.js.map