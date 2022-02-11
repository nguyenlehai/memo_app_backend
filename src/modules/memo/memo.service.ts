import { Headers, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemosFilterDto } from './dto/memos-filter.dto';
import { MemoRepository } from './memo.repository';

import jwt = require('jsonwebtoken');

import * as config from 'config';
import { CreateMemoDto } from './dto/create.dto';
import { UpdateMemoDto } from './dto/update.dto';
import { CustomerRepository } from '../customer/customer.repository';

const jwtConfig = config.get('JWT');

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoRepository) private memoRepository: MemoRepository,
        @InjectRepository(CustomerRepository) private customerRepository: CustomerRepository,
    ) {}

    async getMemosByFilter(@Headers() headers, memosfilterDto: MemosFilterDto): Promise<any> {
        const { authorization } = headers;

        const hasTokenAndNotFilterCompanyId = authorization && !memosfilterDto.companyId;

        if (hasTokenAndNotFilterCompanyId) {
            const accessToken = authorization.split(' ')[1];
            const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);
            memosfilterDto.companyId = payload.sub['companyId'];
        }

        return {
            memos: await this.memoRepository.getMemosByFilter(memosfilterDto),
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }

    async createMemo(@Headers() headers, createMemoDto: CreateMemoDto): Promise<any> {
        const accessToken = headers.authorization.split(' ')[1];

        const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);

        const createdBy = payload.sub['accountId'];

        const isValidCustomer = await this.customerRepository.findOne({ customerId: createMemoDto.customerId });

        if (!isValidCustomer) throw new NotFoundException({ message: 'NOT_FOUND_CUSTOMER', status: HttpStatus.NOT_FOUND });

        return {
            memo: await this.memoRepository.createMemo(createMemoDto, createdBy),
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }

    async updateMemo(updatMemoDto: UpdateMemoDto, memoId: string): Promise<any> {
        await this.memoRepository.updateMemo(updatMemoDto, memoId);

        return {
            message: 'SUCCESS',
            status: HttpStatus.OK,
        };
    }
}
