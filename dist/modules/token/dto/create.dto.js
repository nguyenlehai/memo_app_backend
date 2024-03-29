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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokenDto = void 0;
const class_validator_1 = require("class-validator");
const token_type_enum_1 = require("../token-type.enum");
class CreateTokenDto {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], CreateTokenDto.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "token", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    __metadata("design:type", Date)
], CreateTokenDto.prototype, "expires", void 0);
__decorate([
    class_validator_1.IsIn([token_type_enum_1.TokenType.REFRESH_TOKEN, token_type_enum_1.TokenType.RESET_PASSWORD]),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "type", void 0);
exports.CreateTokenDto = CreateTokenDto;
//# sourceMappingURL=create.dto.js.map