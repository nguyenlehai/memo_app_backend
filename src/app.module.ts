import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import * as typeOrmConfig from './database/config/typeorm.config';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app.logging';
import { TokenModule } from './modules/token/token.module';
import { AccountModule } from './modules/account/account.module';
import { CompanyModule } from './modules/company/company.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MemoModule } from './modules/memo/memo.module';
@Module({
    imports: [
        AuthModule,
        TokenModule,
        AccountModule,
        CompanyModule,
        CustomerModule,
        MemoModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        WinstonModule.forRoot(winstonOptions),
    ],
    controllers: [],
})
export class AppModule {}
