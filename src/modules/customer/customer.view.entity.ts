import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@ViewEntity({
    expression: (connection: Connection) =>
        connection
            .createQueryBuilder()
            .addSelect('customer.id', 'id')
            .addSelect('customer.customerId', 'internalCustomerId')
            .addSelect('customer.externalCustomerId', 'customerId')
            .addSelect('customer.customerName', 'customerName')
            .addSelect('customer.companyId', 'companyId')
            .addSelect('customer.createdAt', 'createdAt')
            .addSelect('customer.updatedAt', 'updatedAt')
            .addSelect('customer.deletedAt', 'deletedAt')
            .from(CustomerEntity, 'customer'),
})
export class CandidateCustomer {
    @ViewColumn()
    id: number;

    @ViewColumn()
    customerId: string;

    @ViewColumn()
    internalCustomerId: string;

    @ViewColumn()
    customerName: string;

    @ViewColumn()
    companyId: string;

    @ViewColumn()
    createdAt: Date;

    @ViewColumn()
    updatedAt: Date;

    @ViewColumn()
    deletedAt: Date;
}
