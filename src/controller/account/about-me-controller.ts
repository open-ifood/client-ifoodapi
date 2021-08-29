import {
  successResponse,
  failResponse,
} from './../../middleware/handle-status-reponse';
import { AuthRequest } from './../../middleware/auth-middleware';
import { Response } from 'express';
import { MarketplaceAPI } from '../../service';

export default async (req: AuthRequest, res: Response) => {
  const accountInformation = await MarketplaceAPI.getCustomerInformation({
    access_token: req.session?.access_token || '',
  });

  const { account, success, message } = accountInformation;

  if (!success)
    return failResponse(
      res,
      {
        message: message || 'Ocorreu um problema ao obter dados da conta',
      },
      account
    );

  return successResponse(
    res,
    {
      message: 'Informações do perfil obtida com sucesso',
    },
    account
  );
};
