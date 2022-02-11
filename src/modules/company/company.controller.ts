import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CreateCompanyDto } from './dto/create.dto';

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @UseGuards(AuthGuard())
    @Get('/')
    getCompaniesByFilter(@Query(ValidationPipe) companiesfilterDto: CompaniesFilterDto): Promise<any> {
        return this.companyService.getCompaniesByFilter(companiesfilterDto);
    }

    // @UseGuards(AuthGuard())
    @Post('/')
    createCompany(@Body(ValidationPipe) createCompanyDto: CreateCompanyDto): Promise<any> {
        return this.companyService.createCompany(createCompanyDto);
    }
}
