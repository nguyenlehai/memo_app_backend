"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const create_dto_1 = require("./dto/create.dto");
const customer_dto_1 = require("./dto/customer.dto");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CustomerRepository');
    }
    async getCustomersByFilter(customersfilterDto) {
        try {
            const { companyId, keyword, page, limit } = customersfilterDto;
            const queryBuilder = await typeorm_1.getConnection()
                .createQueryBuilder()
                .addSelect('customer.id', 'id')
                .addSelect('customer.customerId', 'customerId')
                .addSelect('customer.customerName', 'customerName')
                .addSelect('customer.companyId', 'companyId')
                .addSelect('customer.updatedAt', 'updatedAt')
                .addSelect('customer.createdAt', 'createdAt')
                .addSelect('customer.createdBy', 'createdBy')
                .addSelect('customer.deletedBy', 'deletedBy')
                .addSelect('customer.deletedAt', 'deletedAt')
                .from('customer', 'customer')
                .orderBy('createdAt', 'DESC');
            if (companyId)
                queryBuilder.where('customer.companyId = :companyId', { companyId });
            if (keyword) {
                const regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
                const foundJapanCharacters = regex.test(keyword);
                if (!foundJapanCharacters) {
                    queryBuilder.andWhere(`(MATCH(customer.customerId, customer.customerName) AGAINST ('${keyword}' IN BOOLEAN MODE) OR (customer.customerId like '%${keyword}%') OR (customer.customerName like '%${keyword}%'))`);
                }
                else {
                    queryBuilder.andWhere(`MATCH(customer.customerId, customer.customerName) AGAINST ('${keyword}' IN BOOLEAN MODE)`);
                }
            }
            console.log(queryBuilder.getSql());
            const result = await nestjs_typeorm_paginate_1.paginateRaw(queryBuilder, { page, limit });
            return {
                data: class_transformer_1.plainToClass(customer_dto_1.CustomerDto, result.items),
                total: result.meta.totalItems
            };
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
    async createCustomer(createCustomerDto, createdBy) {
        const { customerId, customerName, companyId, note } = createCustomerDto;
        const customer = new customer_entity_1.CustomerEntity();
        customer.customerId = customerId;
        customer.customerName = customerName;
        customer.companyId = companyId;
        customer.createdBy = createdBy;
        customer.note = note;
        try {
            const result = await this.save(customer);
            return class_transformer_1.plainToClass(create_dto_1.CreateCustomerDto, result);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
};
CustomerRepository = __decorate([
    typeorm_1.EntityRepository(customer_entity_1.CustomerEntity)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map