import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './app.swagger';
import { Logger, NestApplicationOptions } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app.logging';
import * as config from 'config';
const serveConfig = config.get('SERVER');

async function bootstrap() {
    const logger = serveConfig.NODE_ENV === "production" ?
        WinstonModule.createLogger(winstonOptions) :
        new Logger('Bootstrap Logger');

    const nestAppOptions: NestApplicationOptions = {
        logger: logger,
    };

    const app = await NestFactory.create(AppModule, nestAppOptions);

    // global prefix
    app.setGlobalPrefix('api/v1');

    // secure app by setting various HTTP headers.
    app.use(helmet());

    // enable gzip compression.
    app.use(compression());

    // protect app from brute-force attacks
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );

    app.enableCors();

    setupSwagger(app);

    const port = serveConfig.PORT;

    await app.listen(port);

    logger.log(`Application listening on port ${port}`);
}

bootstrap();
