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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_repository_1 = require("./customer.repository");
const customers_filter_dto_1 = require("./dto/customers-filter.dto");
const jwt = require("jsonwebtoken");
const config = require("config");
const create_dto_1 = require("./dto/create.dto");
const company_repository_1 = require("../company/company.repository");
const jwtConfig = config.get('JWT');
let CustomerService = class CustomerService {
    constructor(customerRepository, companyRepository) {
        this.customerRepository = customerRepository;
        this.companyRepository = companyRepository;
    }
    async getCustomersByFilter(headers, customersfilterDto) {
        const { authorization } = headers;
        const hasTokenAndNotFilterCompanyId = authorization && !customersfilterDto.companyId;
        if (hasTokenAndNotFilterCompanyId) {
            const accessToken = authorization.split(' ')[1];
            const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);
            customersfilterDto.companyId = payload.sub['companyId'];
        }
        return {
            customers: await this.customerRepository.getCustomersByFilter(customersfilterDto),
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
    async createCustomer(headers, createCustomerDto) {
        const accessToken = headers.authorization.split(' ')[1];
        const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);
        const createdBy = payload.sub['accountId'];
        const isValidCustomer = await this.customerRepository.findOne({ customerId: createCustomerDto.customerId });
        if (isValidCustomer) {
            return {
                message: 'VALID_CUSTOMER_ID',
                status: common_1.HttpStatus.NOT_FOUND,
            };
        }
        await this.customerRepository.createCustomer(createCustomerDto, createdBy);
        return {
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customers_filter_dto_1.CustomersFilterDto]),
    __metadata("design:returntype", Promise)
], CustomerService.prototype, "getCustomersByFilter", null);
__decorate([
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerService.prototype, "createCustomer", null);
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(customer_repository_1.CustomerRepository)),
    __param(1, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        company_repository_1.CompanyRepository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map