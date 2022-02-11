import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRepository } from './repositories/auth.repository';

import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from '../token/token.service';
import { AccountService } from '../account/account.service';
import { AccountRepository } from '../account/account.repository';
import { CompanyRepository } from '../company/company.repository';

const jwtConfig = config.get('JWT');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConfig.SECRET_KEY,
            signOptions: {
                expiresIn: `${jwtConfig.ACCESS_TOKEN_EXPIRATION_DAY}d`,
            },
        }),
        TypeOrmModule.forFeature([AuthRepository, AccountRepository, CompanyRepository]),
    ],
    controllers: [AuthController],
    providers: [AccountService, AuthService, TokenService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
