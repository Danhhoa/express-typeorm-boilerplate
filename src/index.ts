require('dotenv').config();

import 'reflect-metadata';
import logger from './configs/logger.config';
import app from './configs/server.config';
import envConfig from './configs/env.config';
import { initDB } from './configs/database.config';

const connect = async () => {
    try {
        initDB();

        app.listen(envConfig.app.port, () => {
            logger.info(
                `Server is running at ${envConfig.app.host}:${envConfig.app.port} with NODE_ENV: ${envConfig.nodeEnv}`,
            );
        });
    } catch (e) {
        logger.info(
            `The connection to database was failed with error: ${e}`,
        );
    }
};

connect();
