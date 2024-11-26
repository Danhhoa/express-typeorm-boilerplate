require('dotenv').config();

import 'reflect-metadata';
import logger from './configs/logger.config';
import app from './configs/server.config';
import envConfig from './configs/env.config';
import { initDB } from './configs/database.config';
import socketService from './services/socket.service';

const connect = async () => {
    try {
        initDB();

        app.listen(envConfig.app.port, () => {
            logger.info(
                `Server is running at ${envConfig.app.host}:${envConfig.app.port} with NODE_ENV: ${envConfig.nodeEnv}`,
            );
        });

        // Init socket
        await socketService
            .init(app)
            .then(() => {
                logger.info(`Socket Server is running`);
            })
            .catch((err) => {
                logger.error(`Socket Server init error: ${err}`);
            });
    } catch (e) {
        logger.info(
            `The connection to database was failed with error: ${e}`,
        );
    }
};

connect();
