import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as config from 'config';

const dbConfig = config.get('DB');

const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.TYPE,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    entities: [join(__dirname, '..', '..', 'modules', '**', '*.entity.{js,ts}')],
    synchronize: dbConfig.SYNCHRONIZE,
    migrationsRun: dbConfig.MIGRATIONSRUN,
    migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    cli: {
        migrationsDir: join('src', 'database', 'migrations'),
    },
};

module.exports = typeOrmConfig;
