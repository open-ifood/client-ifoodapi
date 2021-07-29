import { successResponse } from './../middleware/handle-status-reponse';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  return successResponse(res, {
    message: 'API running fine... thanks my  friend.',
  });
};
