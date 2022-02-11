"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_swagger_1 = require("./app.swagger");
const common_1 = require("@nestjs/common");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const nest_winston_1 = require("nest-winston");
const app_logging_1 = require("./app.logging");
const config = require("config");
const serveConfig = config.get('SERVER');
async function bootstrap() {
    const logger = serveConfig.NODE_ENV === "production" ?
        nest_winston_1.WinstonModule.createLogger(app_logging_1.winstonOptions) :
        new common_1.Logger('Bootstrap Logger');
    const nestAppOptions = {
        logger: logger,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, nestAppOptions);
    app.setGlobalPrefix('api/v1');
    app.use(helmet());
    app.use(compression());
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    app.enableCors();
    app_swagger_1.setupSwagger(app);
    const port = serveConfig.PORT;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map