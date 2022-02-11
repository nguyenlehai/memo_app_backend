import { AccountEntity } from '../account/account.entity';
import { CustomerEntity } from '../customer/customer.entity';
export declare class MemoEntity {
    id: number;
    customerId: string;
    memo: string;
    deletedAt: Date;
    deletedBy: number;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
    account: AccountEntity;
    customer: CustomerEntity;
}
