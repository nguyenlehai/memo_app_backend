import { IsDefined, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class CreateAccountDto extends AbstractDto {
    @IsDefined()
    @IsString()    
    username: string;

    @IsDefined()
    @IsString()    
    password: string;

    @IsDefined()
    @IsString()
    accountName: string;

    @IsDefined()
    @IsString()
    companyId: string;
}
