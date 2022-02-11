import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CustomerController } from './customer.controller';
import { CompanyRepository } from '../company/company.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRepository, CompanyRepository]), AuthModule],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
