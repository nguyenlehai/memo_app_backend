import { Repository } from 'typeorm';
import { AccountEntity } from 'src/modules/account/account.entity';
import { SignInDto } from '../dto/sign-in.dto';
export declare class AuthRepository extends Repository<AccountEntity> {
    validateUserPassword(signInCredentialsDto: SignInDto): Promise<AccountEntity>;
}
