import path from 'path';

import AppError from '../errors/AppError';
import UserSurvey from '../database/models/UserSurvey';

import UsersSurveysRepository from '../database/repositories/implementations/UsersSurveysRepository';

interface UpdateSurvey {
  value: number;
  user_survey_id: string;
}

class UpdateSurveyRating {
  userSurveyRepository: UsersSurveysRepository;

  constructor(userSurveyRepository: UsersSurveysRepository) {
    this.userSurveyRepository = userSurveyRepository;
  }

  async execute({ user_survey_id, value }: UpdateSurvey): Promise<UserSurvey> {
    const userSurvey = await this.userSurveyRepository.findById(user_survey_id);

    if (!userSurvey) {
      throw new AppError('Information not found', 404);
    }

    const newSurveyToUser = {
      user_survey_id,
      rating: value,
    };

    const updatedRelation = await this.userSurveyRepository.updateRating(newSurveyToUser);

    return updatedRelation;
  }
}

export default UpdateSurveyRating;
