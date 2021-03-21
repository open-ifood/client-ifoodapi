import { Response } from 'express';
import { AuthRequest } from '../middleware/auth-middleware';
import {
  failResponse,
  successResponse,
} from '../middleware/handle-status-reponse';
import { WsAPI } from '../service/ifoodapi';
import restaurantMenuValidator from '../validator/restaurant-menu-validator';

export async function restaurantMenuController(
  req: AuthRequest,
  res: Response
) {
  const {
    valid,
    requestBody,
    message: messageValidator,
  } = restaurantMenuValidator(req);
  const { access_token, restaurant_id } = requestBody;

  if (!valid)
    return failResponse(res, {
      message: messageValidator || 'Ocorrreu um problema',
    });

  const { success, menu, message } = await WsAPI.getRestaurantMenu({
    access_token,
    restaurant_id,
  });

  if (!success)
    return failResponse(res, {
      message:
        message ||
        'Ocorreu um problema durante a requisição do menu na api do ifood',
      code: 500,
    });

  return successResponse(
    res,
    {
      message: 'Menu do restaurante obtido com sucesso',
    },
    {
      menu,
    }
  );
}
