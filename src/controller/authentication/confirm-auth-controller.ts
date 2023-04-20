import * as IFoodSDK from '@open-ifood/sdk';
import { Request, Response } from 'express';
import {
  failResponse,
  successResponse,
} from '../../middleware/handle-status-reponse';
import { Session } from '../../model/session';
import confirmAuthValidator from '../../validator/authentication/confirm-auth-validator';

export default async (req: Request, res: Response) => {
  const validator = confirmAuthValidator(req);

  if (!validator.valid || !validator.requestBody)
    return failResponse(res, validator);

  const { auth_code, email } = validator.requestBody;

  const session = await Session.findOne({ email: { $eq: email } });

  if (!session || !session.key)
    return failResponse(res, {
      message:
        'Uma sessão para esse não foi encontrada, comece a autenticação pelo /auth',
    });

  const {
    access_token,
    message: confirmTokenEmailMessage,
    success: confirmTokenEmailSuccess,
  } = await IFoodSDK.confirmTokenEmail({
    auth_code,
    key: session.key,
    email,
  });

  if (!confirmTokenEmailSuccess || !access_token)
    return failResponse(res, {
      message:
        confirmTokenEmailMessage ||
        'Ocorreu um problema ao confirmar o seu auth_code, reinicie a autenticação',
    });

  const {
    access_token: new_access_token,
    refresh_token,
    authenticated,
    account_id,
    success,
    message: authMessage,
  } = await IFoodSDK.auth({
    access_token,
    email,
  });

  if (!success || !authenticated)
    return failResponse(res, {
      message:
        authMessage ||
        'Ocorreu um problema ao finalizar autenticacao com o IFood',
    });

  await Session.updateOne(
    { email: { $eq: email } },
    {
      access_token: new_access_token,
      refresh_token,
      authenticated,
      account_id,
    }
  );

  return successResponse(
    res,
    {
      message:
        'Sessão autenticada 100%, agora você pode utilizar os endpoints privados',
    },
    {
      mytoken: session.token,
    }
  );
};
