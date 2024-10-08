import { IBaseError } from '@/interfaces/error.interface';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

export const notFoundErrorHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: {
            code: HttpStatus.NOT_FOUND,
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        },
    });
};

export const errorHandler = (
    err: IBaseError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
            code: err.code || HttpStatus.INTERNAL_SERVER_ERROR,
            message:
                err.message ||
                HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                ),
        },
    });
};
