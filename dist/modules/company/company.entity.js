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
exports.CompanyEntity = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const customer_entity_1 = require("../customer/customer.entity");
let CompanyEntity = class CompanyEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 100, type: 'varchar' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "companyName", void 0);
__decorate([
    typeorm_1.Column({ unique: true, length: 45, type: 'varchar' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "companyId", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true, default: null }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "srcType", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], CompanyEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Index("updatedAt"),
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], CompanyEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => account_entity_1.AccountEntity, account => account.company),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "accounts", void 0);
__decorate([
    typeorm_1.OneToMany(type => customer_entity_1.CustomerEntity, customer => customer.companyId, {}),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "customers", void 0);
CompanyEntity = __decorate([
    typeorm_1.Entity({
        name: 'company',
    })
], CompanyEntity);
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=company.entity.js.map