"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_entity_1 = require("../../modules/account/account.entity");
const company_entity_1 = require("../../modules/company/company.entity");
class AccountSeeder {
    async run(factory, connection) {
        const company = await factory(company_entity_1.CompanyEntity)().createMany(1);
        await factory(account_entity_1.AccountEntity)({ company }).createMany(1);
    }
}
exports.default = AccountSeeder;
//# sourceMappingURL=account.seed.js.map