"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const MemoEntity_1 = require("../entities/MemoEntity");
const CustomerEntity_1 = require("../entities/CustomerEntity");
const CompanyEntity_1 = require("../entities/CompanyEntity");
const AccountEntity_1 = require("../entities/AccountEntity");
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await (0, typeorm_1.createConnection)({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'markitone',
            entities: [AccountEntity_1.AccountEntity, CompanyEntity_1.CompanyEntity, CustomerEntity_1.CustomerEntity, MemoEntity_1.MemoEntity],
            synchronize: true,
        }),
    },
];
//# sourceMappingURL=database.providers.js.map