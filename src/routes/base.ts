import { Request, Response } from 'express';

import logger from '@/configs/logger.config';
import { HTTPError } from '@/errors/base';
import { IBaseError } from '@/interfaces/error.interface';
import * as _ from 'lodash';
import { IPaginationReq } from '../interfaces/common.interface';

const CHANNEL_ID_NOTIFICATION_GROUP =
    process.env.CHANNEL_ID_NOTIFICATION_GROUP;

export class BaseRouter {
    onError(res: Response, error: IBaseError) {
        // const userAgent = res.req.headers['user-agent'] || undefined;
        // const dataHeader = res.req.headers;
        // if (!userAgent.includes('Postman')) {
        //     const tags: any = {
        //         headers: {
        //             host: dataHeader?.host,
        //             ip:
        //                 dataHeader['x-forwarded-for'] ||
        //                 res.req.socket.remoteAddress ||
        //                 null,
        //             authorization: dataHeader.authorization,
        //         },
        //         method: res.req.method,
        //         originalUrl: res.req.originalUrl,
        //         params: res.req.params,
        //         query: res.req.query,
        //         body: res.req.body,
        //     };
        //     error.tags = tags;

        //     const paramsBodyTelegram: any = {
        //         channel: CHANNEL_ID_NOTIFICATION_GROUP,
        //         text: `* error: ${JSON.stringify(
        //             error.options,
        //         )}\n* userAgent: ${userAgent}\n* env: ${
        //             process.env.NODE_ENV
        //         }\n* platform: ${res.req.headers['platform']}\n* tag: ${JSON.stringify(
        //             tags,
        //         )}`,
        //     };

        //     if (res.req.headers['localhost']) {
        //         paramsBodyTelegram.text = `* localhost:  ===> ${res.req.headers['localhost']} <===\n ${paramsBodyTelegram.text}`;
        //     }
        // }

        console.error(error);
        logger.error(error?.message);

        if (error instanceof HTTPError) {
            return res.status(error.tupleErrorParams.code).json({
                success: false,
                error: error.tupleErrorParams,
            });
        }

        return res.status(500).json({
            success: false,
            error: {
                message: error?.message || 'UNEXPECTED',
            },
        });
    }

    onSuccess = (res: Response, data: any, status: number = 200) => {
        res.status(status);
        let responseData: any = { success: true, data };

        res.json(responseData);
    };

    onSuccessAsList(
        res: Response,
        data: any = [],
        pagination?: IPaginationReq,
    ) {
        const total = data.count > 0 ? data.count : 0;
        const page = _.floor(pagination.offset / pagination.limit) + 1;

        return res.json({
            code: 200,
            data,
            pagination: {
                total: total,
                currentPage: page,
                nextPage: page + 1,
                prevPage: page - 1,
                limit: Number(pagination.limit),
            },
        });
    }

    route<T>(func: (req: Request, rep: Response) => Promise<T>) {
        return (req: Request, res: Response) =>
            func
                .bind(this)(req, res)
                .catch((error: IBaseError) => {
                    return this.onError(res, error);
                });
    }
}
