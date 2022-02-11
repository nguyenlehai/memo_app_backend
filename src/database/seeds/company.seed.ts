import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CompanyEntity } from '../../modules/company/company.entity';

export default class CompanySeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(CompanyEntity)().createMany(1);
    }
}
