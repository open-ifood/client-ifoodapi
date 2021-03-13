import { Response } from 'express';
import { Validator } from '../validator/first-auth-validator';

export const successResponse = (
  res: Response,
  validator?: Validator,
  data?: object
) => {
  return res.status(validator?.code || 200).json({
    status: 'success',
    message: validator?.message,
    data,
  });
};

export const failResponse = (
  res: Response,
  validator?: Validator,
  data?: object
) => {
  return res.status(validator?.code || 400).json({
    status: 'fail',
    message: validator?.message,
    data,
  });
};
