import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/CompanyEntity';
export declare class CompanyService {
    private readonly companyRepository;
    constructor(companyRepository: Repository<CompanyEntity>);
    create(company_id: string): Promise<CompanyEntity>;
}
