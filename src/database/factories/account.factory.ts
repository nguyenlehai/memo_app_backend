import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { AccountEntity } from 'src/modules/account/account.entity';
import * as bcrypt from 'bcryptjs';
import { CompanyEntity } from 'src/modules/company/company.entity';

define(AccountEntity, (faker: typeof Faker, context: { company: CompanyEntity } | undefined) => {
    const firstName = faker.name.firstName();
    
    const lastName = faker.name.lastName();

    const account = new AccountEntity();

    account.username = 'markitone';

    account.externalAccountId = firstName;

    account.accountName = lastName;

    account.companyId = context.company[0].companyId;

    account.password = bcrypt.hash('markitone', 10);

    return account;
});
