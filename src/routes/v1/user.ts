import { userController } from '@/controllers';
import { loginSchema } from '@/validations/schemas/user.schema';
import { Request, Response, Router } from 'express';
import { BaseRouter } from '../base';

class UserRouter extends BaseRouter {
    router: Router;
    constructor() {
        super();
        this.router = Router();
        this.router.get('/', this.route(this.allStudent));
        this.router.post('/login', this.route(this.login));
    }

    async login(req: Request, res: Response) {
        const body = req.body;

        await loginSchema.validateAsync(body);

        return this.onSuccess(res, true);
    }

    async allStudent(req: Request, res: Response) {
        const { page, limit } = req.query;

        const result = await userController.allStudent();

        return this.onSuccessAsList(res, result, {
            offset: page,
            limit,
        } as any);
    }
}

const userRouter = new UserRouter().router;

export default userRouter;
