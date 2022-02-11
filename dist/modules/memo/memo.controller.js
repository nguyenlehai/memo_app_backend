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
exports.MemoController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_dto_1 = require("./dto/create.dto");
const memos_filter_dto_1 = require("./dto/memos-filter.dto");
const update_dto_1 = require("./dto/update.dto");
const memo_service_1 = require("./memo.service");
let MemoController = class MemoController {
    constructor(memoService) {
        this.memoService = memoService;
    }
    getMeMosByFilter(headers, memosfilterDto) {
        return this.memoService.getMemosByFilter(headers, memosfilterDto);
    }
    createMemo(headers, createMemoDto) {
        return this.memoService.createMemo(headers, createMemoDto);
    }
    updateMemo(updateMemoDto, memoId) {
        return this.memoService.updateMemo(updateMemoDto, memoId);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Get('/'),
    __param(0, common_1.Headers()), __param(1, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, memos_filter_dto_1.MemosFilterDto]),
    __metadata("design:returntype", Promise)
], MemoController.prototype, "getMeMosByFilter", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Post('/'),
    __param(0, common_1.Headers()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.CreateMemoDto]),
    __metadata("design:returntype", Promise)
], MemoController.prototype, "createMemo", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Put('/:memoId'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Param('memoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateMemoDto, Object]),
    __metadata("design:returntype", Promise)
], MemoController.prototype, "updateMemo", null);
MemoController = __decorate([
    common_1.Controller('memos'),
    __metadata("design:paramtypes", [memo_service_1.MemoService])
], MemoController);
exports.MemoController = MemoController;
//# sourceMappingURL=memo.controller.js.map