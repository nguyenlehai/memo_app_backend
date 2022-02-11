import { HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create.dto';
import { CustomerDto } from './dto/customer.dto';
import { CustomersFilterDto } from './dto/customers-filter.dto';
import { paginateRaw } from 'nestjs-typeorm-paginate';
@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
    private logger = new Logger('CustomerRepository');

    async getCustomersByFilter(customersfilterDto: CustomersFilterDto): Promise<any> {
        try {
            const { companyId, keyword, page, limit } = customersfilterDto;

            const queryBuilder = await getConnection()
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
                .orderBy('createdAt', 'DESC')

            if (companyId) queryBuilder.where('customer.companyId = :companyId', { companyId });

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

            const result = await paginateRaw(queryBuilder, { page, limit });

            return {
                data: plainToClass(CustomerDto, result.items),
                total: result.meta.totalItems
            }
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }

    async createCustomer(createCustomerDto: CreateCustomerDto, createdBy: number): Promise<CreateCustomerDto> {
        const { customerId, customerName, companyId, note } = createCustomerDto;

        const customer = new CustomerEntity();

        customer.customerId = customerId;

        customer.customerName = customerName;

        customer.companyId = companyId;

        customer.createdBy = createdBy;

        customer.note = note;

        try {
            const result = await this.save(customer);

            return plainToClass(CreateCustomerDto, result);
        } catch (error) {
            this.logger.error(error.message, error.stack);

            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
}
