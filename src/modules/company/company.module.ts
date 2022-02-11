import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyController } from './company.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository]), AuthModule],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
