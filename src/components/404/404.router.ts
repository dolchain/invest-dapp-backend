import httpStatus from 'http-status';
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.all('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json(httpStatus[httpStatus.NOT_FOUND]);
});

export default router;