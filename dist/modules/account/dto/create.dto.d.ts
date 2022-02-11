import { AbstractDto } from '../../../common/dto/abstract.dto';
export declare class CreateAccountDto extends AbstractDto {
    username: string;
    password: string;
    accountName: string;
    companyId: string;
}
