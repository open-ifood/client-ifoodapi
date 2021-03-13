import { Router } from 'express';
import notFoundController from './controller/not-found-controller';

const routes = Router();

routes.all('*', notFoundController);

export default routes;
