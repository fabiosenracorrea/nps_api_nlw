import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

function userInfoChecker(request: Request, response: Response, next: NextFunction) {
  const { title, description } = request.body;

  if (!title || !description) {
    throw new AppError('Incorrect Information Provided');
  }

  return next();
}

export default userInfoChecker;
