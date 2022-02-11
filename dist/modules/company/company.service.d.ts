import { CompanyRepository } from './company.repository';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CreateCompanyDto } from './dto/create.dto';
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: CompanyRepository);
    getCompaniesByFilter(companiesfilterDto: CompaniesFilterDto): Promise<any>;
    createCompany(createCompanyDto: CreateCompanyDto): Promise<any>;
}
