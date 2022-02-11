import { HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyDto } from './dto/create.dto';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
    private logger = new Logger('CompanyRepository');

    async getCompaniesByFilter(companiesfilterDto: CompaniesFilterDto): Promise<CompanyDto[]> {
        const { companyId, companyName } = companiesfilterDto;

        const query = this.createQueryBuilder('company');

        if (companyId) query.andWhere('company.companyId = :companyId', { companyId });

        if (companyName) query.andWhere('company.companyName = :companyName', { companyName });

        try {
            const companies = await query.getMany();

            return plainToClass(CompanyDto, companies);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<CreateCompanyDto> {
        const { companyId, companyName } = createCompanyDto;

        const company = new CompanyEntity();

        company.companyId = companyId;

        company.companyName = companyName;

        try {
            const result = await this.save(company);

            return plainToClass(CreateCompanyDto, result);
        } catch (error) {
            this.logger.error(error.message, error.stack);

            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
}
