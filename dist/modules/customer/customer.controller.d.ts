import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create.dto';
import { CustomersFilterDto } from './dto/customers-filter.dto';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getCustomersByFilter(headers: any, customersfilterDto: CustomersFilterDto): Promise<any>;
    createCustomer(headers: any, createCustomerDto: CreateCustomerDto): Promise<any>;
}
