import { HTTPError } from '@/errors/base';
import { Request, Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseRouter } from '../base';

class UserRouter extends BaseRouter {
    router: Router;
    constructor() {
        super();
        this.router = Router();
        this.router.get('/', this.route(this.testAPI));
    }

    async testAPI(req: Request, res: Response): Promise<any> {
        throw new Error('bl bla');
        throw new HTTPError({
            message: 'loi roi',
            code: StatusCodes.CONFLICT,
            messageCode: 'BLA',
        });
        this.onSuccess(res, 'babah');
    }
}

const userRouter = new UserRouter().router;

export default userRouter;
