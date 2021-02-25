import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

function userInfoChecker(request: Request, response: Response, next: NextFunction) {
  const { name, email } = request.body;

  if (!name || !email) {
    throw new AppError('Incorrect Information Provided');
  }

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    throw new AppError('Incorrect Information Provided');
  }

  return next();
}

export default userInfoChecker;
