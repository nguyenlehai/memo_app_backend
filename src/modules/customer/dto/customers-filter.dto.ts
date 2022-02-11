import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CustomersFilterDto {
    @IsOptional()
    @IsString()
    companyId: string;

    @IsOptional()
    @IsString()
    keyword: string;

    @IsNotEmpty()
    @IsString()
    page: string;

    @IsNotEmpty()
    @IsString()
    limit: string;
}
