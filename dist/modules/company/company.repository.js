"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const company_dto_1 = require("./dto/company.dto");
const create_dto_1 = require("./dto/create.dto");
let CompanyRepository = class CompanyRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CompanyRepository');
    }
    async getCompaniesByFilter(companiesfilterDto) {
        const { companyId, companyName } = companiesfilterDto;
        const query = this.createQueryBuilder('company');
        if (companyId)
            query.andWhere('company.companyId = :companyId', { companyId });
        if (companyName)
            query.andWhere('company.companyName = :companyName', { companyName });
        try {
            const companies = await query.getMany();
            return class_transformer_1.plainToClass(company_dto_1.CompanyDto, companies);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
    async createCompany(createCompanyDto) {
        const { companyId, companyName } = createCompanyDto;
        const company = new company_entity_1.CompanyEntity();
        company.companyId = companyId;
        company.companyName = companyName;
        try {
            const result = await this.save(company);
            return class_transformer_1.plainToClass(create_dto_1.CreateCompanyDto, result);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
};
CompanyRepository = __decorate([
    typeorm_1.EntityRepository(company_entity_1.CompanyEntity)
], CompanyRepository);
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=company.repository.js.map