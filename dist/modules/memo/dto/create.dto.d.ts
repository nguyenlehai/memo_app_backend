import { AbstractDto } from '../../../common/dto/abstract.dto';
export declare class CreateMemoDto extends AbstractDto {
    readonly customerId: string;
    readonly memo: string;
}
