import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TokenEntity } from './token.entity';

@EntityRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {
    private logger = new Logger('TokenRepository');
}
