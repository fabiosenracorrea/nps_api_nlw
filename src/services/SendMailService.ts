import AppError from '../errors/AppError';
import { SendMailServiceDTO, CreateUserSurvey } from '../dtos/createUserSurveyDTO';
import UserSurvey from '../database/models/UserSurvey';

import UserRepository from '../database/repositories/implementations/UserRepository';
import SurveyRepository from '../database/repositories/implementations/SurveyRepository';
import UsersSurveysRepository from '../database/repositories/implementations/UsersSurveysRepository';
import MailProvider from '../providers/SendMail';

class SendMailService {
  userRepository: UserRepository;

  surveyRepository: SurveyRepository;

  userSurveyRepository: UsersSurveysRepository;

  mailProvider: MailProvider;

  constructor(
    userRepository: UserRepository,
    surveyRepository: SurveyRepository,
    userSurveyRepository: UsersSurveysRepository,
    mailProvider: MailProvider,
  ) {
    this.userRepository = userRepository;
    this.surveyRepository = surveyRepository;
    this.userSurveyRepository = userSurveyRepository;
    this.mailProvider = mailProvider;
  }

  async execute({ survey_id, email }: SendMailServiceDTO): Promise<UserSurvey> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email not found', 404);
    }

    const survey = await this.surveyRepository.findById(survey_id);

    if (!survey) {
      throw new AppError('Survey not found', 404);
    }

    const newSurveyToUser = {
      email,
      survey_id,
      user_id: user.id,
    };

    const createdRelation = await this.userSurveyRepository.createRating(newSurveyToUser);

    await this.mailProvider.sendMail({
      to: user.email,
      body: survey.description,
      subject: survey.title,
    });

    return createdRelation;
  }
}

export default SendMailService;
