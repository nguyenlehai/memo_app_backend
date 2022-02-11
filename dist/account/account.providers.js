"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountProviders = void 0;
const AccountEntity_1 = require("../entities/AccountEntity");
exports.accountProviders = [
    {
        provide: 'ACCOUNT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(AccountEntity_1.AccountEntity),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=account.providers.js.map