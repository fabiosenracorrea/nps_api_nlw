import UserSurvey from '../../models/UserSurvey';

import { CreateUserSurvey } from '../../../dtos/createUserSurveyDTO';

interface iUsersSurveysRepository {
  createRating(surveyInfo: CreateUserSurvey): Promise<UserSurvey>;
}

export default iUsersSurveysRepository;
