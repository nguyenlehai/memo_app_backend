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
exports.CandidateCustomer = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
let CandidateCustomer = class CandidateCustomer {
};
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Number)
], CandidateCustomer.prototype, "id", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateCustomer.prototype, "customerId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateCustomer.prototype, "internalCustomerId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateCustomer.prototype, "customerName", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateCustomer.prototype, "companyId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateCustomer.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateCustomer.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateCustomer.prototype, "deletedAt", void 0);
CandidateCustomer = __decorate([
    typeorm_1.ViewEntity({
        expression: (connection) => connection
            .createQueryBuilder()
            .addSelect('customer.id', 'id')
            .addSelect('customer.customerId', 'internalCustomerId')
            .addSelect('customer.externalCustomerId', 'customerId')
            .addSelect('customer.customerName', 'customerName')
            .addSelect('customer.companyId', 'companyId')
            .addSelect('customer.createdAt', 'createdAt')
            .addSelect('customer.updatedAt', 'updatedAt')
            .addSelect('customer.deletedAt', 'deletedAt')
            .from(customer_entity_1.CustomerEntity, 'customer'),
    })
], CandidateCustomer);
exports.CandidateCustomer = CandidateCustomer;
//# sourceMappingURL=customer.view.entity.js.map