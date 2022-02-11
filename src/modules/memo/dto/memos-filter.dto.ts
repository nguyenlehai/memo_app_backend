import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MemosFilterDto {
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