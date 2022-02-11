import { Exclude, Expose } from 'class-transformer';
import { AbstractDto } from '../../../common/dto/abstract.dto';

@Exclude()
export class CustomerDto extends AbstractDto {
    @Expose()
    id: string;

    @Expose()
    createdAt: Date;

    @Expose()
    customerId: string;

    @Expose()
    customerName: string;

    @Expose()
    companyId: string;
}
