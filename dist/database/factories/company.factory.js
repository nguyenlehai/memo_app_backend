"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_entity_1 = require("../../modules/company/company.entity");
const typeorm_seeding_1 = require("typeorm-seeding");
typeorm_seeding_1.define(company_entity_1.CompanyEntity, (faker) => {
    const company = new company_entity_1.CompanyEntity();
    company.companyName = faker.random.word();
    company.companyId = faker.random.word();
    return company;
});
//# sourceMappingURL=company.factory.js.map