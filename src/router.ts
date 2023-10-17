import { Router } from 'express';

// import healthCheck from '@components/healthCheck/healthCheck.router';
import users from '@components/users/public/users.router';

const router: Router = Router();
// router.use(healthCheck);
router.use(users);

export default router;