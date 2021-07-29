import { Request } from 'express';

export interface RequestBodyConfirmAuth {
  email: string;
  auth_code: number;
}

export type Validator = {
  valid?: boolean;
  message: string;
  code?: number;
  requestBody?: RequestBodyConfirmAuth;
};

export default (req: Request): Validator => {
  const { email, auth_code } = req.body;
  const errors: Array<any> = [];

  if (!email) errors.push({ message: 'O campo e-mail é obrigatório' });
  if (!auth_code) errors.push({ message: 'O campo auth_code é obrigatório' });

  const valid = errors.length <= 0;

  return {
    valid,
    message: !valid
      ? errors.map(error => error.message).join(', ')
      : 'Campos corretos',
    requestBody: {
      email: email.trim(),
      auth_code: parseInt(auth_code),
    },
  };
};
