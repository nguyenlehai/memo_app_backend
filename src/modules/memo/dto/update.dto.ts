import { IsNotEmpty, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class UpdateMemoDto extends AbstractDto {
    @IsNotEmpty()
    @IsString()
    readonly memo: string;
}
