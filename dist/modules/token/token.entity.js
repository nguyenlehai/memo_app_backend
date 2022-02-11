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
exports.TokenEntity = void 0;
const typeorm_1 = require("typeorm");
const token_type_enum_1 = require("./token-type.enum");
const account_entity_1 = require("../account/account.entity");
let TokenEntity = class TokenEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], TokenEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", Number)
], TokenEntity.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", String)
], TokenEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", Date)
], TokenEntity.prototype, "expires", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: token_type_enum_1.TokenType, default: token_type_enum_1.TokenType.REFRESH_TOKEN }),
    __metadata("design:type", String)
], TokenEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], TokenEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], TokenEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => account_entity_1.AccountEntity, account => account.tokens),
    typeorm_1.JoinColumn({
        name: 'accountId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", account_entity_1.AccountEntity)
], TokenEntity.prototype, "account", void 0);
TokenEntity = __decorate([
    typeorm_1.Entity({
        name: 'token',
    })
], TokenEntity);
exports.TokenEntity = TokenEntity;
//# sourceMappingURL=token.entity.js.map