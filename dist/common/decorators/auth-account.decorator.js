"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAccount = void 0;
const common_1 = require("@nestjs/common");
const account_entity_1 = require("../../modules/account/account.entity");
exports.AuthAccount = common_1.createParamDecorator((data, request) => request.account);
//# sourceMappingURL=auth-account.decorator.js.map