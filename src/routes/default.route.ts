import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  throw new Error();
  res.json({ message: 'ExpressJS, Typescript, TypeORM, Postgres' });
});

export default router;
