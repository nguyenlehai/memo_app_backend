import { IsDefined, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class CreateMemoDto extends AbstractDto {
    @IsDefined()
    @IsString()
    readonly customerId: string;

    @IsDefined()
    @IsString()
    readonly memo: string;
}
