"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoRepository = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const memo_dto_1 = require("./dto/memo.dto");
const memo_entity_1 = require("./memo.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let MemoRepository = class MemoRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('MemoRepository');
    }
    async getMemosByFilter(memosFilterDto) {
        const { companyId, keyword, limit, page } = memosFilterDto;
        try {
            const queryBuilder = await typeorm_1.getConnection()
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
                .orderBy('createdAt', 'DESC');
            if (companyId)
                queryBuilder.where("account.companyId =:companyId", { companyId });
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
                    queryBuilder.andWhere(`MATCH(memo.customerId, memo.memo) AGAINST ('${keyword}' IN BOOLEAN MODE)`);
                }
            }
            console.log(queryBuilder.getSql(), page, limit);
            const result = await nestjs_typeorm_paginate_1.paginateRaw(queryBuilder, { page, limit });
            return {
                data: class_transformer_1.plainToClass(memo_dto_1.MemoDto, result.items),
                total: result.meta.totalItems
            };
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createMemo(createMemoDto, createdBy) {
        const { customerId, memo } = createMemoDto;
        const task = new memo_entity_1.MemoEntity();
        task.customerId = customerId;
        task.memo = memo;
        task.createdBy = createdBy;
        try {
            const result = await this.save(task);
            return class_transformer_1.plainToClass(memo_dto_1.MemoDto, result);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
    async updateMemo(updateMemoDto, memoId) {
        try {
            const memo = await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(memo_entity_1.MemoEntity)
                .set({ memo: updateMemoDto.memo })
                .where('id = :memoId', { memoId })
                .execute();
            return class_transformer_1.plainToClass(memo_dto_1.MemoDto, memo);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException({ message: 'ERROR', status: common_1.HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
};
MemoRepository = __decorate([
    typeorm_1.EntityRepository(memo_entity_1.MemoEntity)
], MemoRepository);
exports.MemoRepository = MemoRepository;
//# sourceMappingURL=memo.repository.js.map