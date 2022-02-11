import { CompanyService } from './company.service';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CreateCompanyDto } from './dto/create.dto';
export declare class CompanyController {
    private companyService;
    constructor(companyService: CompanyService);
    getCompaniesByFilter(companiesfilterDto: CompaniesFilterDto): Promise<any>;
    createCompany(createCompanyDto: CreateCompanyDto): Promise<any>;
}
