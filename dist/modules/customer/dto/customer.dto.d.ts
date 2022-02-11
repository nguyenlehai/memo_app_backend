import { AbstractDto } from '../../../common/dto/abstract.dto';
export declare class CustomerDto extends AbstractDto {
    id: string;
    createdAt: Date;
    customerId: string;
    customerName: string;
    companyId: string;
}
