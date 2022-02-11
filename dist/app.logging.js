"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonOptions = void 0;
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
exports.winstonOptions = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
        }),
        new winston.transports.File({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
            filename: 'app.log',
        }),
    ],
};
//# sourceMappingURL=app.logging.js.map