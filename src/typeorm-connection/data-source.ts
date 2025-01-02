import envConfig from '../configs/env.config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSource = new DataSource({
    type: 'mysql',
    host: envConfig.database.host,
    port: Number(envConfig.database.port),
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
                  'dist/typeorm-connection/migrations/*.{js}',
                  'dist/typeorm-connection/seeds/*.{js}',
              ]
            : [
                  'src/typeorm-connection/migrations/*.{js,ts}',
                  'src/typeorm-connection/seeds/*.{js,ts}',
              ],
    namingStrategy: new SnakeNamingStrategy(),
    timezone: 'Z', // Mysql store default timestamp as UTC and will convert to local when query, this line to say use UTC and no need to convert
});

export default dataSource;
