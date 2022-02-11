import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CreateCompanyDto } from './dto/create.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

    async getCompaniesByFilter(companiesfilterDto: CompaniesFilterDto): Promise<any> {
        return {
            companies: await this.companyRepository.getCompaniesByFilter(companiesfilterDto),
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<any> {
        const isValidCompany = await this.companyRepository.findOne({ companyId: createCompanyDto.companyId });

        if (isValidCompany) throw new ConflictException({ message: 'VALID_COMPANY', status: HttpStatus.OK });

        await this.companyRepository.createCompany(createCompanyDto);

        return {
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }
}
