import { Request } from 'express';

export type Validator = {
  valid?: boolean;
  message: string;
  code?: number;
};

export default (req: Request): Validator => {
  let valid: boolean = true;
  let code: number = 200;
  let message: string = '';

  const { email } = req.body;

  if (!email) {
    valid = false;
    message = 'O campo e-mail é obrigatório';
    code = 400;
  }

  return {
    valid,
    message,
    code,
  };
};
