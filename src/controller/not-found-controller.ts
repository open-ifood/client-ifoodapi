import { Request, Response } from 'express';
import { failResponse } from '../middleware/handle-status-reponse';

export default (_: Request, res: Response) => {
  return failResponse(res, {
    message: 'Ops! Esse endpoint não existe, verifique a URL.',
    code: 404,
  });
};
