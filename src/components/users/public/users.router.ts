import { Router } from 'express';

import authByBearerToken from '@core/middleware/verifyToken.middleware';
import validation from '@core/middleware/validate.middleware';
import createUserValidation from '../domain/createUser.validation';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../domain/users.controller';

const router: Router = Router();

router.post(
  '/user/',
  [authByBearerToken, validation(createUserValidation)],
  createUser,
);
router.get('/user/:id', getUser);
router.put('/user/:id', [authByBearerToken], updateUser);
router.delete('/user/:id', [authByBearerToken], deleteUser);

export default router;