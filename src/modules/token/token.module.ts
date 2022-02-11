import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TokenController } from './token.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TokenRepository]), AuthModule],
    controllers: [TokenController],
    providers: [TokenService],
})
export class TokenModule {}
