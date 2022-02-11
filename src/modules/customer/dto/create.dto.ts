import { Expose } from 'class-transformer';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class CreateCustomerDto extends AbstractDto {
    @Expose()
    customerId: string;

    @Expose()
    customerName: string;

    @Expose()
    companyId: string;

    @Expose()
    note: string;
}
