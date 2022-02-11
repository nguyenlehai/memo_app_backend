import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';

@Exclude()
export class AccountsFilterDto extends AbstractDto {
    @IsOptional()
    companyId: string;

    @IsOptional()
    accountName: string;

    @IsOptional()
    accountId: string;
}
