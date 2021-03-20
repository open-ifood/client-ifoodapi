import { Router } from 'express';
import authController from './controller/auth-controller';
import notFoundController from './controller/not-found-controller';

const routes = Router();

routes.post('/auth', authController);
routes.all('*', notFoundController);

export default routes;
