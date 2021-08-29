import { AuthRequest } from './../../middleware/auth-middleware';

export interface RequestBody {
  access_token: string;
}

export type Validator = {
  valid?: boolean;
  message?: string;
  code?: number;
  requestBody: RequestBody;
};

export default (req: AuthRequest): Validator => {
  let errorMessage;
  const {} = req.body;

  return {
    valid: !errorMessage,
    message: errorMessage || '',
    requestBody: {
      access_token: req?.session?.access_token || '',
    },
  };
};
