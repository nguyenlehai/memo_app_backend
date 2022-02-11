import { Exclude, Expose } from 'class-transformer';
import { AbstractDto } from '../../../common/dto/abstract.dto';

@Exclude()
export class CompanyDto extends AbstractDto {
    @Expose()
    companyId: string;
    
    @Expose()
    companyName: string;
}
