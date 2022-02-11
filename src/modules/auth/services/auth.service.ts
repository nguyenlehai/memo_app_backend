import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AccountEntity } from 'src/modules/account/account.entity';
import { AccountDto } from 'src/modules/account/dto/account.dto';
import { TokenService } from 'src/modules/token/token.service';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(@InjectRepository(AuthRepository) private authRepository: AuthRepository, private tokenService: TokenService) {}

    async signIn(signInDto: SignInDto): Promise<any> {
        const account = await this.authRepository.validateUserPassword(signInDto);

        if (!account) throw new NotFoundException({ message: 'NOT_FOUND_ACCOUNT', status: HttpStatus.NOT_FOUND });

        const tokens = await this.tokenService.generateAuthTokens(account.id, account.companyId);

        return {
            account: plainToClass(AccountDto, account),
            tokens: tokens,
            status: HttpStatus.OK,
            message: 'SUCCESS',
        };
    }

    getAuthenticatedUser(account: AccountEntity): AccountDto {
        return plainToClass(AccountDto, account);
    }
}
