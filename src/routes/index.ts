import * as express from 'express';

import userRouter from './v1/user';

const router = express.Router();

router.use('/user', userRouter);
router.use('/', (req: express.Request, res: express.Response) => {
    return res.json(`Server is running: ${new Date()}`);
});

export default router;
