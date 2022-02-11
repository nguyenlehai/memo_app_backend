import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { AccountEntity } from './account.entity';

@ViewEntity({
    expression: (connection: Connection) =>
        connection
            .createQueryBuilder()
            .addSelect('account.id', 'id')
            .addSelect('account.username', 'internalAccountId')
            .addSelect('account.externalAccountId', 'accountId')
            .addSelect('account.accountName', 'accountName')
            .addSelect('account.password', 'password')
            .addSelect('account.companyId', 'companyId')
            .addSelect('account.deletedAt', 'deletedAt')
            .addSelect('account.createdAt', 'createdAt')
            .addSelect('account.updatedAt', 'updatedAt')
            .from(AccountEntity, 'account'),
})
export class CandidateAccount {
    @ViewColumn()
    id: number;

    @ViewColumn()
    internalAccountId: string;

    @ViewColumn()
    accountId: string;

    @ViewColumn()
    accountName: string;

    @ViewColumn()
    password: string;

    @ViewColumn()
    companyId: string;

    @ViewColumn()
    deletedAt: Date;

    @ViewColumn()
    createdAt: Date;

    @ViewColumn()
    updatedAt: Date;
}
