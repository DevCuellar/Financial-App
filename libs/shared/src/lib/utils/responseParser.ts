import { Response } from 'express';

export const sendSuccess = (res: Response, data: unknown) => {
  return res.json(data);
};

export const sendError = (res: Response, errors: string[], status = 500) => {
  return res.status(status).json({ errors: errors });
};
