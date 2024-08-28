import envConfig from '../configs/env.config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: envConfig.database.host,
    port: parseInt(envConfig.database.port),
    username: envConfig.database.username,
    password: envConfig.database.password,
    database: envConfig.database.dbName,
    synchronize: false,
    entities:
        process.env.NODE_ENV === 'production'
            ? ['dist/**/*.entity.js']
            : ['**/**.entity.ts'],
    logging: process.env.NODE_ENV !== 'production',
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

export default AppDataSource;