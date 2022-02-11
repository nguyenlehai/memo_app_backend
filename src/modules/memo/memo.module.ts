import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoRepository } from './memo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MemoController } from './memo.controller';
import { CustomerRepository } from '../customer/customer.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MemoRepository, CustomerRepository]), AuthModule],
    controllers: [MemoController],
    providers: [MemoService],
})
export class MemoModule {}
