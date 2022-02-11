import { HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh.dto';
import jwt = require('jsonwebtoken');
import { TokenRepository } from './token.repository';
import { TokenDto } from './dto/token.dto';
import { TokensDto } from './dto/tokens.dto';
import moment = require('moment');
import * as config from 'config';
import { TokenType } from './token-type.enum';
import { TokenEntity } from './token.entity';
import { plainToClass } from 'class-transformer';
import { AccountRepository } from '../account/account.repository';
import { Connection } from 'typeorm';

const jwtConfig = config.get('JWT');

@Injectable()
export class TokenService {
    private logger = new Logger('TokenService');

    private tokenRepository: TokenRepository;
    private accountRepository: AccountRepository;

    constructor(private readonly connection: Connection) {
        this.tokenRepository = this.connection.getCustomRepository(TokenRepository);
        this.accountRepository = this.connection.getCustomRepository(AccountRepository);
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
        const { refreshToken } = refreshTokenDto;

        const refreshTokenDoc = await this.verifyToken(refreshToken, TokenType.REFRESH_TOKEN);

        const account = await this.accountRepository.findOne({ id: refreshTokenDoc.accountId });

        if (!account) throw new NotFoundException({ message: 'NOT_FOUND_ACCOUNT', status: HttpStatus.NOT_FOUND });

        await this.tokenRepository.remove(refreshTokenDoc);

        const tokens = await this.generateAuthTokens(account.id, account.companyId);

        return { tokens, message: 'SUCCESS', status: HttpStatus.OK };
    }

    async verifyToken(token: string, type: TokenType): Promise<TokenEntity> {
        try {
            const payload = jwt.verify(token, jwtConfig.SECRET_KEY);

            const tokenDoc = await this.tokenRepository.findOne({
                where: {
                    token,
                    type,
                    accountId: payload.sub['accountId'],
                },
            });

            if (!tokenDoc) throw new NotFoundException({ message: 'NOT_FOUND_TOKEN', status: HttpStatus.NOT_FOUND });

            return tokenDoc;
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new NotFoundException({ message: 'NOT_FOUND_TOKEN', status: HttpStatus.NOT_FOUND });
        }
    }

    async generateAuthTokens(accountId: number, companyId: string): Promise<TokensDto> {
        const accessTokenExpires = moment().add(jwtConfig.ACCESS_TOKEN_EXPIRATION_DAYS, 'days');

        const accessToken = this.generateToken(accountId, companyId, accessTokenExpires, TokenType.ACCESS_TOKEN, jwtConfig.SECRET_KEY);

        const refreshTokenExpires = moment().add(jwtConfig.REFRESH_TOKEN_EXPIRATION_DAYS, 'days');

        const refreshToken = this.generateToken(accountId, companyId, refreshTokenExpires, TokenType.REFRESH_TOKEN, jwtConfig.SECRET_KEY);

        await this.saveToken(accountId, refreshToken, refreshTokenExpires, TokenType.REFRESH_TOKEN);

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
        };
    }

    generateToken(accountId: number, companyId: string, expires: moment.Moment, type: string, secret: string): string {
        const payload = {
            sub: {
                accountId,
                companyId,
            },
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        };

        return jwt.sign(payload, secret);
    }
    error;
    async saveToken(accountId: number, token: string, expires: moment.Moment, type: TokenType): Promise<TokenDto> {
        const tokenEntity = new TokenEntity();

        tokenEntity.accountId = accountId;

        tokenEntity.token = token;

        tokenEntity.expires = expires.toDate();

        tokenEntity.type = type;

        try {
            const result = await this.tokenRepository.save(tokenEntity);
            return plainToClass(TokenDto, result);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException({ message: 'ERROR_SAVE_TOKEN', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
}
