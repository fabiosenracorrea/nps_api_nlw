import { Request, Response } from 'express';

import SendMailService from '../services/SendMailService';
import UpdateSurveyRatingService from '../services/UpdateSurveyRatingService';

import SurveyRepository from '../database/repositories/implementations/SurveyRepository';
import UsersSurveysRepository from '../database/repositories/implementations/UsersSurveysRepository';
import UserRepository from '../database/repositories/implementations/UserRepository';
import MailProvider from '../providers/SendMail';
import AppError from '../errors/AppError';

class SurveyController {
  async create(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const surveyRepository = new SurveyRepository();
    const userRepository = new UserRepository();
    const usersSurveysRepository = new UsersSurveysRepository();
    const mailProvider = new MailProvider();

    const sendMailService = new SendMailService(
      userRepository,
      surveyRepository,
      usersSurveysRepository,
      mailProvider,
    );

    const emailToSend = {
      email,
      survey_id,
    };

    const createdSurvey = await sendMailService.execute(emailToSend);

    return response.status(201).json(createdSurvey);
  }

  async update(request: Request, response: Response) {
    const { rating } = request.params;
    const { id } = request.query;

    if (!id) {
      throw new AppError('Invalid Id provided');
    }

    const ratingAsNumber = Number(rating);
    const ratingIsOfValidRange =
      ratingAsNumber >= 1 && ratingAsNumber <= 10 && Number.isInteger(ratingAsNumber);

    if (!ratingIsOfValidRange) {
      throw new AppError('Invalid rating provided');
    }

    const usersSurveysRepository = new UsersSurveysRepository();

    const updateSurveyRating = new UpdateSurveyRatingService(usersSurveysRepository);

    const infoToUpdate = {
      user_survey_id: String(id),
      value: ratingAsNumber,
    };

    const updatedSurvey = await updateSurveyRating.execute(infoToUpdate);

    return response.status(201).json(updatedSurvey);
  }
}

export default SurveyController;
