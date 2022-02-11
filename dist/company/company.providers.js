"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyProviders = void 0;
const CompanyEntity_1 = require("../entities/CompanyEntity");
exports.companyProviders = [
    {
        provide: 'COMPANY_REPOSITORY',
        useFactory: (connection) => connection.getRepository(CompanyEntity_1.CompanyEntity),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=company.providers.js.map