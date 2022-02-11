import { IsOptional } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class CompaniesFilterDto extends AbstractDto {
    @IsOptional()
    readonly companyId: string;

    @IsOptional()
    readonly companyName: string;
}
    