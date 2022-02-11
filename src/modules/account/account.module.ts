import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../company/company.repository';
import { TokenService } from '../token/token.service';

@Module({
    imports: [TypeOrmModule.forFeature([AccountRepository, CompanyRepository]), AuthModule],
    controllers: [AccountController],
    providers: [AccountService, TokenService],
    exports: [AccountService],
})
export class AccountModule {}
