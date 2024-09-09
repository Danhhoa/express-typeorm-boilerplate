import envConfig from '../configs/env.config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSource = new DataSource({
    type: 'postgres',
    host: envConfig.database.host,
    port: Number(envConfig.database.port),
    // url: envConfig.database.url,
    username: envConfig.database.username,
    password: envConfig.database.password,
    database: envConfig.database.dbName,
    synchronize: false,
    entities:
        process.env.NODE_ENV === 'production'
            ? ['dist/**/*.entity.js']
            : ['**/**.entity.ts'],
    logging: process.env.NODE_ENV !== 'production' ? ['error'] : false,
    migrations:
        process.env.NODE_ENV === 'production'
            ? [
                  'dist/typeorm/migrations/*.{js}',
                  'dist/typeorm/seeds/*.{js}',
              ]
            : [
                  'src/typeorm/migrations/*.{js,ts}',
                  'src/typeorm/seeds/*.{js,ts}',
              ],
    namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
