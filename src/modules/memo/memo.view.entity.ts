import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { MemoEntity } from './memo.entity';

@ViewEntity({
    expression: (connection: Connection) =>
        connection
            .createQueryBuilder()
            .addSelect('memo.id', 'id')
            .addSelect('account.username', 'internalAccountId')
            .addSelect('account.externalAccountId', 'accountId')
            .addSelect('account.accountName', 'accountName')
            .addSelect('account.companyId', 'companyId')
            .addSelect('memo.customerId', 'internalCustomerId')
            .addSelect('customer.externalCustomerId', 'customerId')
            .addSelect('customer.customerName', 'customerName')
            .addSelect('memo.memo', 'memo')
            .addSelect('memo.deletedAt', 'deletedAt')
            .addSelect('memo.createdAt', 'createdAt')
            .addSelect('memo.createdBy', 'createdBy')
            .from(MemoEntity, 'memo')
            .leftJoin(AccountEntity, 'account', 'account.id = memo.createdBy')
            .leftJoin(CustomerEntity, 'customer', 'customer.customerId = memo.customerId'),
})
export class CandidateMemo {
    @ViewColumn()
    id: number;

    @ViewColumn()
    internalAccountId: string;

    @ViewColumn()
    accountId: string;

    @ViewColumn()
    accountName: string;

    @ViewColumn()
    companyId: string;

    @ViewColumn()
    internalCustomerId: string;

    @ViewColumn()
    customerId: string;

    @ViewColumn()
    customerName: string;

    @ViewColumn()
    memo: string;

    @ViewColumn()
    deletedAt: Date;

    @ViewColumn()
    createdAt: Date;

    @ViewColumn()
    createdBy: Date;
}
