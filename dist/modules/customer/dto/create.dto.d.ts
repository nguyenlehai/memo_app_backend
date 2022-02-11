import { AbstractDto } from '../../../common/dto/abstract.dto';
export declare class CreateCustomerDto extends AbstractDto {
    customerId: string;
    customerName: string;
    companyId: string;
    note: string;
}
