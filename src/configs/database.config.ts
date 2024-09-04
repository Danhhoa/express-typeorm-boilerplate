import AppDataSource from '../typeorm/data-source';
import envConfig from './env.config';
import logger from './logger.config';

export const initDB = () => {
    AppDataSource.initialize()
        .then(() => {
            logger.info('Data Source has been initialized!');
        })
        .catch((err) => {
            logger.error('Error during Data Source initialization!');
            console.error(
                'Error during Data Source initialization:',
                err,
            );
        });
};
