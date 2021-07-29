import { Request, Response } from 'express';
import {
  failResponse,
  successResponse,
} from '../../middleware/handle-status-reponse';
import { MarketplaceAPI } from '../../service/ifoodapi';
import { Session } from '../../model/session';
import { firstAuthValidator } from '../../validator';

export default async (req: Request, res: Response) => {
  const { valid, message, code, requestBody } = firstAuthValidator(req);

  if (!valid || !requestBody)
    return failResponse(res, {
      message,
      code,
    });

  const { email } = requestBody;

  const {
    success,
    message: ifoodResponseMessage,
    key,
  } = await MarketplaceAPI.sendTokenEmail({ email });

  if (!success || !key)
    return failResponse(res, {
      message:
        ifoodResponseMessage ||
        'Ocorre um problema durante a autenticação no IFood, valide seus dados',
    });

  const session = new Session();
  session.email = email;
  session.key = key;

  if (await Session.exists({ email: { $eq: email } })) {
    session.updateOne();
  } else {
    session.save();
  }

  return successResponse(res, {
    message:
      'Sua sessão foi iniciada no iFood com sucesso, por favor continue com o próximo passo da autenticação.',
  });
};
