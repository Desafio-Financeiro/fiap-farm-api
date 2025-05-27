import { Router, Request, Response } from 'express';

const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', (req: Request, res: Response) => {
  res.json({ title: 'fiap-farm-api' });
});

export default indexRouter;
