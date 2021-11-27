import { successSimpleResponse } from './../../middleware/handle-status-reponse';
import { Response } from 'express';
import { failResponse } from '../../middleware/handle-status-reponse';
import * as IFoodSDK from '@open-ifood/sdk';
import { AuthRequest } from './../../middleware/auth-middleware';

export default async (req: AuthRequest, res: Response) => {
  const access_token = req.session?.access_token;

  if (!access_token) {
    return failResponse(res, {
      message: 'Sessão nao encontrada, realize a autenticação',
    });
  }

  const {
    addressId,
    deliveryMethod,
    paymentSources,
    restaurantOrder,
    scheduled,
    test,
  } = req.body;

  const { success, message, orderCheckout } = await IFoodSDK.order({
    access_token,
    addressId,
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
