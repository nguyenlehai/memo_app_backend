import { MemoEntity } from '../memo/memo.entity';
import { CompanyEntity } from '../company/company.entity';
export declare class CustomerEntity {
    id: number;
    customerId: string;
    externalCustomerId: string;
    customerName: string;
    companyId: string;
    note: string;
    createdBy: number;
    deletedBy: number;
    deletedAt: number;
    createdAt: Date;
    updatedAt: Date;
    memos: MemoEntity[];
    company: CompanyEntity;
}
