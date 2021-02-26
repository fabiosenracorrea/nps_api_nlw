import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

function sendMailInfoChecker(request: Request, response: Response, next: NextFunction) {
  const { survey_id, email } = request.body;

  if (!survey_id || !email) {
    throw new AppError('Incorrect Information Provided');
  }

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    throw new AppError('Incorrect Information Provided');
  }

  return next();
}

export default sendMailInfoChecker;
