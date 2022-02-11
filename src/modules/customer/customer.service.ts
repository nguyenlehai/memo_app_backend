import { ConflictException, Headers, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomersFilterDto } from './dto/customers-filter.dto';

import jwt = require('jsonwebtoken');

import * as config from 'config';
import { CreateCustomerDto } from './dto/create.dto';
import { CompanyRepository } from '../company/company.repository';

const jwtConfig = config.get('JWT');

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerRepository) private customerRepository: CustomerRepository,
        @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository,
    ) {}

    async getCustomersByFilter(@Headers() headers, customersfilterDto: CustomersFilterDto): Promise<any> {
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
            status: HttpStatus.OK,
        };
    }

    async createCustomer(@Headers() headers, createCustomerDto: CreateCustomerDto): Promise<any> {
        const accessToken = headers.authorization.split(' ')[1];

        const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);

        const createdBy = payload.sub['accountId'];

        const isValidCustomer = await this.customerRepository.findOne({ customerId: createCustomerDto.customerId });

        if (isValidCustomer) {
            return {
                message: 'VALID_CUSTOMER_ID',
                status: HttpStatus.NOT_FOUND,
            };
        }

        await this.customerRepository.createCustomer(createCustomerDto, createdBy)

        return {
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }
}
