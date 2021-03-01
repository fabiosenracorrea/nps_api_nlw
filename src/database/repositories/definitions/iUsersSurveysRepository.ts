import UserSurvey from '../../models/UserSurvey';

import { CreateUserSurvey, FindUserSurvey } from '../../../dtos/createUserSurveyDTO';
import { UpdateUserSurveyDTO } from '../../../dtos/updateUserSurveyDTO';

interface iUsersSurveysRepository {
  createRating(surveyInfo: CreateUserSurvey): Promise<UserSurvey>;
  findById(survey_id: string): Promise<UserSurvey | undefined>;
  findByUserAndSurveyId(findInfo: FindUserSurvey): Promise<UserSurvey | undefined>;
  updateRating(updateInfo: UpdateUserSurveyDTO): Promise<UserSurvey>;
  findAllSurveyAnswers(survey_id: string): Promise<UserSurvey[]>;
}

export default iUsersSurveysRepository;
