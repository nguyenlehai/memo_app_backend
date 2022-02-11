import { Body, Controller, Get, Headers, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create.dto';
import { CustomersFilterDto } from './dto/customers-filter.dto';

@Controller('customers')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @UseGuards(AuthGuard())
    @Get('/')
    getCustomersByFilter(@Headers() headers, @Query(ValidationPipe) customersfilterDto: CustomersFilterDto): Promise<any> {
        return this.customerService.getCustomersByFilter(headers, customersfilterDto);
    }

    @UseGuards(AuthGuard())
    @Post('/')
    createCustomer(@Headers() headers, @Body(ValidationPipe) createCustomerDto: CreateCustomerDto): Promise<any> {
        return this.customerService.createCustomer(headers, createCustomerDto);
    }
}
