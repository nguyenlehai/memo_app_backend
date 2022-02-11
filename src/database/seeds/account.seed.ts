import { Factory, Seeder } from 'typeorm-seeding';
import { AccountEntity } from '../../modules/account/account.entity';
import { Connection } from 'typeorm';
import { CompanyEntity } from 'src/modules/company/company.entity';

export default class AccountSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const company = await factory(CompanyEntity)().createMany(1);

        await factory(AccountEntity)({ company }).createMany(1);
    }
}
