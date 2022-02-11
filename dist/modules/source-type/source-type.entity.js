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
exports.SouceTypeEntity = void 0;
const typeorm_1 = require("typeorm");
let SouceTypeEntity = class SouceTypeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], SouceTypeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', unique: true }),
    __metadata("design:type", Number)
], SouceTypeEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], SouceTypeEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], SouceTypeEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], SouceTypeEntity.prototype, "updatedAt", void 0);
SouceTypeEntity = __decorate([
    typeorm_1.Entity({
        name: 'source-types',
    })
], SouceTypeEntity);
exports.SouceTypeEntity = SouceTypeEntity;
//# sourceMappingURL=source-type.entity.js.map