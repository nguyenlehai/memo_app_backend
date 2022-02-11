import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create.dto';
import { CustomersFilterDto } from './dto/customers-filter.dto';
export declare class CustomerRepository extends Repository<CustomerEntity> {
    private logger;
    getCustomersByFilter(customersfilterDto: CustomersFilterDto): Promise<any>;
    createCustomer(createCustomerDto: CreateCustomerDto, createdBy: number): Promise<CreateCustomerDto>;
}
