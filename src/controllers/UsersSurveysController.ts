import { Request, Response } from 'express';

import SendMailService from '../services/SendMailService';
import SurveyRepository from '../database/repositories/implementations/SurveyRepository';
import UsersSurveysRepository from '../database/repositories/implementations/UsersSurveysRepository';
import UserRepository from '../database/repositories/implementations/UserRepository';
import MailProvider from '../providers/SendMail';

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
}

export default SurveyController;
