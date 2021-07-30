import { successResponse } from './../../middleware/handle-status-reponse';
import { AuthRequest } from './../../middleware/auth-middleware';
import { Response } from 'express';
import { MarketplaceAPI } from '../../service';

export default async (req: AuthRequest, res: Response) => {
  const accountInformation = await MarketplaceAPI.getCustomerInformation({
    access_token: req.session?.access_token || '',
  });

  const { account } = accountInformation;

  return successResponse(
    res,
    {
      message: 'Informações do perfil obtida com sucesso',
    },
    account
  );
};
