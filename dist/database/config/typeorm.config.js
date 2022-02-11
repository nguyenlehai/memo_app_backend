"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = require("config");
const dbConfig = config.get('DB');
const typeOrmConfig = {
    type: dbConfig.TYPE,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    entities: [path_1.join(__dirname, '..', '..', 'modules', '**', '*.entity.{js,ts}')],
    synchronize: dbConfig.SYNCHRONIZE,
    migrationsRun: dbConfig.MIGRATIONSRUN,
    migrations: [path_1.join(__dirname, '..', 'migrations', '*.{ts,js}')],
    cli: {
        migrationsDir: path_1.join('src', 'database', 'migrations'),
    },
};
module.exports = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map