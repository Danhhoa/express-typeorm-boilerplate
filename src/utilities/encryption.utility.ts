import envConfig from '@/configs/env.config';
import { MessageErrorCode } from '@/enums';
import { HTTPError } from '@/errors/base';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

interface IJwtDecoded {
    email: string;
    role: any;
    iat: number;
    exp: number;
}
export default class Encryption {
    static async generateHash(
        password: string,
        saltRounds: number,
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(
                password,
                saltRounds,
                (err: any, hash: string) => {
                    if (!err) {
                        resolve(hash);
                    }
                    reject(err);
                },
            );
        });
    }

    static async verifyHash(
        password: string,
        hash: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static async generateToken(key: string, value: string) {}

    static async verifyToken(token: string) {
        const secret = envConfig.app.tokenSecret;

        try {
            const tokenVerified = jwt.verify(token, secret, {
                ignoreExpiration: true,
            }) as IJwtDecoded;

            const now = new Date();
            const tokenExpireTime = new Date(tokenVerified.exp * 1000);

            if (tokenExpireTime <= now) {
                throw new HTTPError({
                    message: 'Token expired',
                    code: StatusCodes.FORBIDDEN,
                    messageCode: MessageErrorCode.TOKEN_EXPIRED,
                });
            }

            return tokenVerified;
        } catch (error) {
            if (error instanceof HTTPError) {
                throw new HTTPError({
                    code: StatusCodes.FORBIDDEN,
                    message: 'Token expired',
                    messageCode: MessageErrorCode.TOKEN_EXPIRED,
                });
            }

            throw new HTTPError({
                code: StatusCodes.UNAUTHORIZED,
                message: 'Invalid token',
                messageCode: MessageErrorCode.UNAUTHORIZED,
            });
        }
    }
}
