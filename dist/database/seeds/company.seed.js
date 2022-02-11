"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_entity_1 = require("../../modules/company/company.entity");
class CompanySeeder {
    async run(factory, connection) {
        await factory(company_entity_1.CompanyEntity)().createMany(1);
    }
}
exports.default = CompanySeeder;
//# sourceMappingURL=company.seed.js.map