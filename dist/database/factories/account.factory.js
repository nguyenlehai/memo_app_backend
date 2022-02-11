"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const account_entity_1 = require("../../modules/account/account.entity");
const bcrypt = require("bcryptjs");
const company_entity_1 = require("../../modules/company/company.entity");
typeorm_seeding_1.define(account_entity_1.AccountEntity, (faker, context) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const account = new account_entity_1.AccountEntity();
    account.username = 'markitone';
    account.externalAccountId = firstName;
    account.accountName = lastName;
    account.companyId = context.company[0].companyId;
    account.password = bcrypt.hash('markitone', 10);
    return account;
});
//# sourceMappingURL=account.factory.js.map