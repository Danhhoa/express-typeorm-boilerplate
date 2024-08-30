import * as express from 'express';
import userRouter from './user';

const routerV1 = express.Router();

routerV1.use('/user', userRouter);
routerV1.use('/', (req: express.Request, res: express.Response) => {
    return res.json(`Server is running: ${new Date()}`);
});

export default routerV1;
