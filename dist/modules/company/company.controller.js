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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const company_service_1 = require("./company.service");
const companies_filter_dto_1 = require("./dto/companies-filter.dto");
const create_dto_1 = require("./dto/create.dto");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    getCompaniesByFilter(companiesfilterDto) {
        return this.companyService.getCompaniesByFilter(companiesfilterDto);
    }
    createCompany(createCompanyDto) {
        return this.companyService.createCompany(createCompanyDto);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Get('/'),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [companies_filter_dto_1.CompaniesFilterDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompaniesByFilter", null);
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
CompanyController = __decorate([
    common_1.Controller('companies'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map