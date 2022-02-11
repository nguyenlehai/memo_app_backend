import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { CompanyEntity } from './company.entity';

@ViewEntity({
    expression: (connection: Connection) =>
        connection
            .createQueryBuilder()
            .addSelect('company.id', 'id')
            .addSelect('company.companyId', 'companyId')
            .addSelect('company.companyName', 'companyName')
            .addSelect('company.srcType', 'srcType')
            .addSelect('company.createdAt', 'createdAt')
            .addSelect('company.updatedAt', 'updatedAt')
            .from(CompanyEntity, 'company'),
})
export class CandidateCompany {
    @ViewColumn()
    id: number;

    @ViewColumn()
    companyId: string;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    createdAt: Date;

    @ViewColumn()
    updatedAt: Date;
}
