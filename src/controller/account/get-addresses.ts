import { successSimpleResponse } from './../../middleware/handle-status-reponse';
import { Response } from 'express';
import { failResponse } from '../../middleware/handle-status-reponse';
import { MarketplaceAPI } from '../../service';
import { AuthRequest } from './../../middleware/auth-middleware';

export default async (req: AuthRequest, res: Response) => {
  const access_token = req.session?.access_token;

  if (!access_token) {
    return failResponse(res, {
      message: 'Acesso negado, realize a autenticação primeiro',
    });
  }

  const get_address_response = await MarketplaceAPI.getAddresses({
    access_token,
  });

  return successSimpleResponse(res, get_address_response);
};
