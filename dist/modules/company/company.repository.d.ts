import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyDto } from './dto/create.dto';
export declare class CompanyRepository extends Repository<CompanyEntity> {
    private logger;
    getCompaniesByFilter(companiesfilterDto: CompaniesFilterDto): Promise<CompanyDto[]>;
    createCompany(createCompanyDto: CreateCompanyDto): Promise<CreateCompanyDto>;
}
