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
exports.CustomerEntity = void 0;
const typeorm_1 = require("typeorm");
const memo_entity_1 = require("../memo/memo.entity");
const company_entity_1 = require("../company/company.entity");
let CustomerEntity = class CustomerEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], CustomerEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Index("customerId"),
    typeorm_1.Column({ length: 64, type: 'varchar' }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "customerId", void 0);
__decorate([
    typeorm_1.Index("externalCustomerId"),
    typeorm_1.Column({ length: 64, type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "externalCustomerId", void 0);
__decorate([
    typeorm_1.Column({ length: 64, type: 'varchar' }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "customerName", void 0);
__decorate([
    typeorm_1.Index("companyId"),
    typeorm_1.Column({ length: 45, type: 'varchar' }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "companyId", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "note", void 0);
__decorate([
    typeorm_1.Column({ type: 'int' }),
    __metadata("design:type", Number)
], CustomerEntity.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CustomerEntity.prototype, "deletedBy", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    __metadata("design:type", Number)
], CustomerEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], CustomerEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Index("updatedAt"),
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], CustomerEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => memo_entity_1.MemoEntity, memo => memo.customerId),
    __metadata("design:type", Array)
], CustomerEntity.prototype, "memos", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.customers),
    typeorm_1.JoinColumn({
        name: 'companyId',
        referencedColumnName: 'companyId',
    }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CustomerEntity.prototype, "company", void 0);
CustomerEntity = __decorate([
    typeorm_1.Entity({
        name: 'customer',
    }),
    typeorm_1.Index(["customerId", "companyId"], { unique: true }),
    typeorm_1.Index(["customerId", "customerName"], { fulltext: true, parser: 'mecab' })
], CustomerEntity);
exports.CustomerEntity = CustomerEntity;
//# sourceMappingURL=customer.entity.js.map