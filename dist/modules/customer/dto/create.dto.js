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
exports.CreateCustomerDto = void 0;
const class_transformer_1 = require("class-transformer");
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
class CreateCustomerDto extends abstract_dto_1.AbstractDto {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "customerId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "customerName", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "companyId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "note", void 0);
exports.CreateCustomerDto = CreateCustomerDto;
//# sourceMappingURL=create.dto.js.map