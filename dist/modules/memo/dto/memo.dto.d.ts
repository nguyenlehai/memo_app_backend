import { AbstractDto } from '../../../common/dto/abstract.dto';
export declare class MemoDto extends AbstractDto {
    customerId: string;
    customerName: string;
    id: string;
    memo: string;
    createdAt: Date;
}
