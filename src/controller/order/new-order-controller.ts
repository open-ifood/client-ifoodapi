import { successSimpleResponse } from './../../middleware/handle-status-reponse';
import { Response } from 'express';
import { failResponse } from '../../middleware/handle-status-reponse';
import { WSApi } from '../../service';
import { AuthRequest } from './../../middleware/auth-middleware';

export default async (req: AuthRequest, res: Response) => {
  const access_token = req.session?.access_token;

  if (!access_token) {
    return failResponse(res, {
      message: 'Sessão nao encontrada, realize a autenticação',
    });
  }

  const {
    address_id,
    deliveryMethod,
    paymentSources,
    restaurantOrder,
    scheduled,
    test,
  } = req.body;

  const { success, message, orderCheckout } = await WSApi.makeOrder({
    access_token,
    address_id,
    deliveryMethod,
    paymentSources,
    restaurantOrder,
    scheduled,
    test,
  });

  if (!success) {
    return failResponse(res, {
      message: message || 'Ocorreu um problema genérico ao realizar pedido',
    });
  }

  return successSimpleResponse(res, {
    orderCheckout,
  });
};