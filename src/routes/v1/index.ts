import * as express from 'express';
import userRouter from './user';

const routerV1 = express.Router();

routerV1.use('/user', userRouter);

export default routerV1;
