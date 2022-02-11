import { Exclude, Expose } from 'class-transformer';
import { AbstractDto } from '../../../common/dto/abstract.dto';

@Exclude()
export class MemoDto extends AbstractDto {
    @Expose()
    customerId: string;

    @Expose()
    customerName: string;

    @Expose()
    id: string;

    @Expose()
    memo: string;

    @Expose()
    createdAt: Date;
}
