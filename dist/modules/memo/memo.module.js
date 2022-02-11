"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoModule = void 0;
const common_1 = require("@nestjs/common");
const memo_service_1 = require("./memo.service");
const memo_repository_1 = require("./memo.repository");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const memo_controller_1 = require("./memo.controller");
const customer_repository_1 = require("../customer/customer.repository");
let MemoModule = class MemoModule {
};
MemoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([memo_repository_1.MemoRepository, customer_repository_1.CustomerRepository]), auth_module_1.AuthModule],
        controllers: [memo_controller_1.MemoController],
        providers: [memo_service_1.MemoService],
    })
], MemoModule);
exports.MemoModule = MemoModule;
//# sourceMappingURL=memo.module.js.map