import { CompanyEntity } from '../../modules/company/company.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(CompanyEntity, (faker: typeof Faker) => {
    const company = new CompanyEntity();

    company.companyName = faker.random.word();
    
    company.companyId = faker.random.word();

    return company;
});
