import { HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateMemoDto } from './dto/create.dto';
import { MemoDto } from './dto/memo.dto';
import { MemosFilterDto } from './dto/memos-filter.dto';
import { UpdateMemoDto } from './dto/update.dto';
import { MemoEntity } from './memo.entity';
import { paginateRaw } from 'nestjs-typeorm-paginate';
@EntityRepository(MemoEntity)
export class MemoRepository extends Repository<MemoEntity> {
    private logger = new Logger('MemoRepository');

    async getMemosByFilter(memosFilterDto: MemosFilterDto): Promise<any> {
        const { companyId, keyword, limit, page } = memosFilterDto;

        try {
            const queryBuilder = await getConnection()
                .createQueryBuilder()
                .addSelect('memo.id', 'id')
                .addSelect('memo.customerId', 'customerId')
                .addSelect('customer.customerName', 'customerName')
                .addSelect('memo.memo', 'memo')
                .addSelect('memo.deletedAt', 'deletedAt')
                .addSelect('memo.createdAt', 'createdAt')
                .addSelect('memo.createdBy', 'createdBy')
                .from('memo', 'memo')
                .leftJoin('customer', 'customer', 'customer.customerId = memo.customerId')
                .leftJoin('account', 'account', 'account.id = memo.createdBy')
                .orderBy('createdAt', 'DESC')

            if (companyId) queryBuilder.where("account.companyId =:companyId", { companyId });

            if (keyword) {
                const regexJapanCharacters = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
                const foundJapanCharacters = regexJapanCharacters.test(keyword);

                const regexCreatedAt = /^([2][01]|[1][6-9])\d{2}(-([0]\d|[1][0-2])-([0-2]\d|[3][0-1])(\s([0-1]\d|[2][0-3])(\:[0-5]\d){1,2})?$)?/g;
                const isCreatedAt = regexCreatedAt.test(keyword);

                if (isCreatedAt) {
                    queryBuilder.andWhere(`(MATCH(memo.customerId, memo.memo) AGAINST ('${keyword}' IN BOOLEAN MODE) OR (customer.createdAt like '%${keyword}%'))`);
                }
                else if (!foundJapanCharacters) {
                    queryBuilder.andWhere(`(MATCH(memo.customerId, memo.memo) AGAINST ('${keyword}' IN BOOLEAN MODE) OR (customer.customerId like '%${keyword}%'))`);
                }
                else {
                    queryBuilder.andWhere(`MATCH(memo.customerId, memo.memo) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
                }
            }

            console.log(queryBuilder.getSql(), page, limit);

            const result = await paginateRaw(queryBuilder, { page, limit });

            return {
                data: plainToClass(MemoDto, result.items),
                total: result.meta.totalItems
            }
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createMemo(createMemoDto: CreateMemoDto, createdBy: number): Promise<MemoDto> {
        const { customerId, memo } = createMemoDto;

        const task = new MemoEntity();

        task.customerId = customerId;

        task.memo = memo;

        task.createdBy = createdBy;

        try {
            const result = await this.save(task);

            return plainToClass(MemoDto, result);
        } catch (error) {
            this.logger.error(error.message, error.stack);

            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }

    async updateMemo(updateMemoDto: UpdateMemoDto, memoId: string): Promise<MemoDto> {
        try {
            const memo = await getConnection()
                .createQueryBuilder()
                .update(MemoEntity)
                .set({ memo: updateMemoDto.memo })
                .where('id = :memoId', { memoId })
                .execute();

            return plainToClass(MemoDto, memo);
        } catch (error) {
            this.logger.error(error.message, error.stack);

            throw new InternalServerErrorException({ message: 'ERROR', status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
}