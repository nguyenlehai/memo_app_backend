import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

import * as config from 'config';
import { AccountService } from 'src/modules/account/account.service';
import { AccountDto } from 'src/modules/account/dto/account.dto';

const jwtConfig = config.get('JWT');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private accountService: AccountService;

    public constructor(accountService: AccountService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.SECRET_KEY,
        });

        this.accountService = accountService;
    }

    async validate(payload: JwtPayload): Promise<AccountDto> {
        const { sub } = payload;

        const account = await this.accountService.getAccountById(sub.accountId);

        if (!account) return null;

        return account;
    }
}
