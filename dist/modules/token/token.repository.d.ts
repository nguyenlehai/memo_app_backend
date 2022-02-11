import { Repository } from 'typeorm';
import { TokenEntity } from './token.entity';
export declare class TokenRepository extends Repository<TokenEntity> {
    private logger;
}
