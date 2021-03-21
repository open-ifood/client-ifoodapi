import { Router } from 'express';
import authController from './controller/auth-controller';
import confirmAuthController from './controller/confirm-auth-controller';
import notFoundController from './controller/not-found-controller';

const routes = Router();

routes.post('/auth', authController);
routes.patch('/confirm-auth', confirmAuthController);
routes.all('*', notFoundController);

export default routes;
