import { successSimpleResponse } from './../../middleware/handle-status-reponse';
import { AuthRequest } from './../../middleware/auth-middleware';
import { Response } from 'express';
import { failResponse } from '../../middleware/handle-status-reponse';
import * as IFoodSDK from '@open-ifood/sdk';

export default async (req: AuthRequest, res: Response) => {
  const access_token = req.session?.access_token;
  const { address } = req.body;

  if (!access_token) {
    return failResponse(res, {
      message: 'Sessão nao encontrada, realize a autenticação',
    });
  }

  const add_address_response = await IFoodSDK.addAddress({
    access_token,
    address,
  });

  return successSimpleResponse(res, add_address_response);
};
