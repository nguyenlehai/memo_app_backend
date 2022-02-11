import { AccountEntity } from '../account/account.entity';
import { CustomerEntity } from '../customer/customer.entity';
export declare class CompanyEntity {
    id: number;
    companyName: string;
    companyId: string;
    srcType: number;
    createdAt: Date;
    updatedAt: Date;
    accounts: AccountEntity[];
    customers: CustomerEntity[];
}
