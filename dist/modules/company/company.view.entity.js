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
exports.CandidateCompany = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
let CandidateCompany = class CandidateCompany {
};
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Number)
], CandidateCompany.prototype, "id", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateCompany.prototype, "companyId", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], CandidateCompany.prototype, "companyName", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateCompany.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Date)
], CandidateCompany.prototype, "updatedAt", void 0);
CandidateCompany = __decorate([
    typeorm_1.ViewEntity({
        expression: (connection) => connection
            .createQueryBuilder()
            .addSelect('company.id', 'id')
            .addSelect('company.companyId', 'companyId')
            .addSelect('company.companyName', 'companyName')
            .addSelect('company.srcType', 'srcType')
            .addSelect('company.createdAt', 'createdAt')
            .addSelect('company.updatedAt', 'updatedAt')
            .from(company_entity_1.CompanyEntity, 'company'),
    })
], CandidateCompany);
exports.CandidateCompany = CandidateCompany;
//# sourceMappingURL=company.view.entity.js.map