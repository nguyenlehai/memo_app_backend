"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const memos_filter_dto_1 = require("./dto/memos-filter.dto");
const memo_repository_1 = require("./memo.repository");
const jwt = require("jsonwebtoken");
const config = require("config");
const create_dto_1 = require("./dto/create.dto");
const customer_repository_1 = require("../customer/customer.repository");
const jwtConfig = config.get('JWT');
let MemoService = class MemoService {
    constructor(memoRepository, customerRepository) {
        this.memoRepository = memoRepository;
        this.customerRepository = customerRepository;
    }
    async getMemosByFilter(headers, memosfilterDto) {
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
            status: common_1.HttpStatus.OK,
        };
    }
    async createMemo(headers, createMemoDto) {
        const accessToken = headers.authorization.split(' ')[1];
        const payload = jwt.verify(accessToken, jwtConfig.SECRET_KEY);
        const createdBy = payload.sub['accountId'];
        const isValidCustomer = await this.customerRepository.findOne({ customerId: createMemoDto.customerId });
        if (!isValidCustomer)
            throw new common_1.NotFoundException({ message: 'NOT_FOUND_CUSTOMER', status: common_1.HttpStatus.NOT_FOUND });
        return {
            memo: await this.memoRepository.createMemo(createMemoDto, createdBy),
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
    async updateMemo(updatMemoDto, memoId) {
        await this.memoRepository.updateMemo(updatMemoDto, memoId);
        return {
            message: 'SUCCESS',
            status: common_1.HttpStatus.OK,
        };
    }
};
__decorate([
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, memos_filter_dto_1.MemosFilterDto]),
    __metadata("design:returntype", Promise)
], MemoService.prototype, "getMemosByFilter", null);
__decorate([
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.CreateMemoDto]),
    __metadata("design:returntype", Promise)
], MemoService.prototype, "createMemo", null);
MemoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(memo_repository_1.MemoRepository)),
    __param(1, typeorm_1.InjectRepository(customer_repository_1.CustomerRepository)),
    __metadata("design:paramtypes", [memo_repository_1.MemoRepository,
        customer_repository_1.CustomerRepository])
], MemoService);
exports.MemoService = MemoService;
//# sourceMappingURL=memo.service.js.map