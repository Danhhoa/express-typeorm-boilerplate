require('dotenv').config();

const envConfig = {
    app: {
        host: process.env.HOST,
        port: process.env.PORT,
        name: process.env.PROJECT_NAME || 'UNKNOWN',
        tokenSecret: process.env.TOKEN_SECRET || '123456',
    },
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        dbName: process.env.DB_NAME,
        url: process.env.DB_URL,
    },
    nodeEnv: process.env.NODE_ENV || 'development',
};

export default envConfig;
