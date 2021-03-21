import { Request, Response } from 'express';
import { Session, SessionModel } from '../model/session';
import { failResponse } from './handle-status-reponse';

export interface AuthRequest extends Request {
  session?: SessionModel;
}

export default async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: Function
) {
  const token = req.header('authorization');
  const session = await Session.findOne({ token: { $eq: token } });

  if (session) {
    req.session = session;
    return next();
  }

  return failResponse(res, {
    code: 401,
    message: 'Autenticação necessária para acessar esse recurso',
  });
}
