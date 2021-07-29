import { AuthRequest } from '../../middleware/auth-middleware';

export interface RequestBody {
  access_token: string;
  merchant_id: string;
}

export type Validator = {
  valid?: boolean;
  message?: string;
  code?: number;
  requestBody: RequestBody;
};

export default (req: AuthRequest): Validator => {
  const { id } = req.params;
  let errorMessage;

  if (!id)
    errorMessage =
      'O campo merchant_id é requerido no momento da busca pelo menu ';

  const valid = !errorMessage;

  return {
    valid,
    message: !valid ? errorMessage : '',
    requestBody: {
      access_token: req.session?.access_token || '',
      merchant_id: id,
    },
  };
};
