import { MessageErrorCode } from '@/enums';
import { HTTPError } from '@/errors/base';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseMiddleware } from './base';

const HEADERS = 'authorization';
export class AuthMiddleware extends BaseMiddleware {
    async use(
        req: Request,
        res: Response,
        next: NextFunction,
        option?: any,
    ): Promise<void> {
        try {
            if (!req.headers[HEADERS]) {
                throw new HTTPError({
                    code: StatusCodes.UNAUTHORIZED,
                    message: 'UNAUTHORIZED',
                    messageCode: MessageErrorCode.UNAUTHORIZED,
                });
            }
            next();
        } catch (error) {
            throw error;
        }
    }
}
