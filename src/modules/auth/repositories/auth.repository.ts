import { Repository, EntityRepository } from 'typeorm';
import { AccountEntity } from 'src/modules/account/account.entity';
import { SignInDto } from '../dto/sign-in.dto';

@EntityRepository(AccountEntity)
export class AuthRepository extends Repository<AccountEntity> {
    async validateUserPassword(signInCredentialsDto: SignInDto): Promise<AccountEntity> {
        // const { username, password, companyId } = signInCredentialsDto;
        const { username, password } = signInCredentialsDto;

        const account = await this.findOne({ username });

        if (!account) return null;

        const isCorrectPassword = await account.validatePassword(password);

        if (!isCorrectPassword) return null;

        return account;
    }
}
