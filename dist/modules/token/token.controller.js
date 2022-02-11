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
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const refresh_dto_1 = require("./dto/refresh.dto");
const token_service_1 = require("./token.service");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    refreshToken(refreshTokenDto) {
        return this.tokenService.refreshToken(refreshTokenDto);
    }
};
__decorate([
    common_1.Post('/refresh'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Object)
], TokenController.prototype, "refreshToken", null);
TokenController = __decorate([
    common_1.Controller('token'),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map