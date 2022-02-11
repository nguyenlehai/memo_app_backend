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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_repository_1 = require("./company.repository");
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async getCompaniesByFilter(companiesfilterDto) {
        return {
            companies: await this.companyRepository.getCompaniesByFilter(companiesfilterDto),
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
    async createCompany(createCompanyDto) {
        const isValidCompany = await this.companyRepository.findOne({ companyId: createCompanyDto.companyId });
        if (isValidCompany)
            throw new common_1.ConflictException({ message: 'VALID_COMPANY', status: common_1.HttpStatus.OK });
        await this.companyRepository.createCompany(createCompanyDto);
        return {
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map