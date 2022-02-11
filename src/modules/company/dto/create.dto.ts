import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
    @IsDefined()
    @IsString()
    @MinLength(1)
    @MaxLength(45)
    readonly companyId: string;
    
    @IsDefined()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly companyName: string;
}
