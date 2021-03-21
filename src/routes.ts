import { Router } from 'express';
import authController from './controller/auth-controller';
import confirmAuthController from './controller/confirm-auth-controller';
import notFoundController from './controller/not-found-controller';
import authMiddleware from './middleware/auth-middleware';

const routes = Router();

routes.post('/auth', authController);
routes.patch('/confirm-auth', confirmAuthController);
routes.use(authMiddleware);
routes.all('*', notFoundController);

export default routes;
