import { Request, Response } from 'express';
import {
  failResponse,
  successResponse,
} from '../../middleware/handle-status-reponse';
import * as IFoodSDK from '@open-ifood/sdk';
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
  } = await IFoodSDK.sendTokenEmail({ email });

  if (!success || !key)
    return failResponse(res, {
      message:
        ifoodResponseMessage ||
        'Ocorre um problema durante a autenticação no IFood, valide seus dados',
    });

  const session =
    (await Session.findOne({ email: { $eq: email } })) || new Session();

  session.email = email;
  session.key = key;
  session.access_token = undefined;
  session.account_id = undefined;
  session.refresh_token = undefined;

  session.save();

  return successResponse(res, {
    message:
      'Sua sessão foi iniciada no iFood com sucesso, por favor continue com o próximo passo da autenticação.',
  });
};
