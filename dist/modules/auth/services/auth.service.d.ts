import { AccountEntity } from 'src/modules/account/account.entity';
import { AccountDto } from 'src/modules/account/dto/account.dto';
import { TokenService } from 'src/modules/token/token.service';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthRepository } from '../repositories/auth.repository';
export declare class AuthService {
    private authRepository;
    private tokenService;
    private logger;
    constructor(authRepository: AuthRepository, tokenService: TokenService);
    signIn(signInDto: SignInDto): Promise<any>;
    getAuthenticatedUser(account: AccountEntity): AccountDto;
}
