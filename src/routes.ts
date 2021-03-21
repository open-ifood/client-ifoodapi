import { Router } from 'express';
import authController from './controller/auth-controller';
import confirmAuthController from './controller/confirm-auth-controller';
import notFoundController from './controller/not-found-controller';
import { restaurantMenuController } from './controller/restaurant-menu-controller';
import authMiddleware from './middleware/auth-middleware';

const routes = Router();

routes.post('/auth', authController);
routes.patch('/confirm-auth', confirmAuthController);
routes.use(authMiddleware);
routes.get('/restaurant/:id?/menu', restaurantMenuController);
routes.all('*', notFoundController);

export default routes;
