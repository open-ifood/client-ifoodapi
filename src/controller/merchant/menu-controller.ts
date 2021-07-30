import { Response, Request } from 'express';
import {
  failResponse,
  successResponse,
} from '../../middleware/handle-status-reponse';
import { WSApi } from '../../service';
import { merchantMenuValidator } from '../../validator';

export default async (req: Request, res: Response) => {
  const {
    valid,
    requestBody,
    message: messageValidator,
  } = merchantMenuValidator(req);
  const { access_token, merchant_id } = requestBody;

  if (!valid)
    return failResponse(res, {
      message: messageValidator || 'Ocorrreu um problema',
    });

  const { success, menu, message } = await WSApi.getMerchantMenu({
    access_token,
    merchant_id,
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
      message: 'Menu do merchante obtido com sucesso',
    },
    {
      menu,
    }
  );
};
