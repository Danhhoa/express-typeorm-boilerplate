import { HTTPError } from '@/errors/base';
import { Request, Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseRouter } from '../base';
import { userController } from '@/controllers';
import { IPaginationReq } from '@/interfaces/common.interface';

class UserRouter extends BaseRouter {
    router: Router;
    constructor() {
        super();
        this.router = Router();
        this.router.get('/', this.route(this.allStudent));
    }

    async allStudent(req: Request, res: Response) {
        const { page, limit } = req.query;
        // throw new HTTPError({
        //     message: 'loi roi',
        //     code: StatusCodes.CONFLICT,
        //     messageCode: 'BLA',
        // });
        const result = await userController.allStudent();

        return this.onSuccessAsList(res, result, {
            offset: page,
            limit,
        } as any);
    }
}

const userRouter = new UserRouter().router;

export default userRouter;
