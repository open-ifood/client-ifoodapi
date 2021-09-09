import { Router } from 'express';
import {
  authController,
  confirmAuthController,
  healthController,
  restaurantMenuController,
  notFoundController,
  aboutMeController,
  newOrderController,
  geocodeAddressController,
  getAddressesController,
  addAddressController,
  paymentMethodsController,
} from './controller';
import authMiddleware from './middleware/auth-middleware';

const routes = Router();

routes.get('/health', healthController);
routes.get('/address/geocode', geocodeAddressController);
routes.get('/merchant/:id?/payment-method', paymentMethodsController);
routes.post('/auth', authController);
routes.patch('/confirm-auth', confirmAuthController);
routes.use(authMiddleware);
routes.get('/merchant/:id?/menu', restaurantMenuController);
routes.put('/order', newOrderController);
routes.get('/me', aboutMeController);
routes.get('/me/addresses', getAddressesController);
routes.put('/me/address', addAddressController);
routes.all('*', notFoundController);

export default routes;
