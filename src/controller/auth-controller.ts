import { request, Request, Response } from 'express';
import {
  failResponse,
  successResponse,
} from '../middleware/handle-status-reponse';
import firstAuthValidator from '../validator/first-auth-validator';
import { MarketplaceAPI } from '../service/ifoodapi';

export default async (req: Request, res: Response) => {
  const { valid, message, code, requestBody } = firstAuthValidator(req);

  if (!valid || !requestBody)
    return failResponse(res, {
      message,
      code,
    });

  const {
    success,
    message: ifoodResponseMessage,
    key,
  } = await MarketplaceAPI.sendTokenEmail({ email: requestBody.email });

  if (!success || !key)
    return failResponse(res, {
      message:
        ifoodResponseMessage ||
        'Ocorre um problema durante a autenticação no IFood, valide seus dados',
    });

  return successResponse(
    res,
    {
      message:
        'Sua sessão foi iniciada no iFood com sucesso, por favor continue com o próximo passo da autenticação.',
    },
    { key }
  );
};
