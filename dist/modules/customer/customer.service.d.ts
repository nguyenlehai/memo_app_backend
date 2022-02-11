import { CustomerRepository } from './customer.repository';
import { CustomersFilterDto } from './dto/customers-filter.dto';
import { CreateCustomerDto } from './dto/create.dto';
import { CompanyRepository } from '../company/company.repository';
export declare class CustomerService {
    private customerRepository;
    private companyRepository;
    constructor(customerRepository: CustomerRepository, companyRepository: CompanyRepository);
    getCustomersByFilter(headers: any, customersfilterDto: CustomersFilterDto): Promise<any>;
    createCustomer(headers: any, createCustomerDto: CreateCustomerDto): Promise<any>;
}
