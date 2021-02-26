import Survey from '../../models/Survey';

import CreateSurveyDTO from '../../../dtos/createSurveyDTO';

interface iSurveyRepository {
  createSurvey(surveyInfo: CreateSurveyDTO): Promise<Survey>;
  findById(survey_id: string): Promise<Survey | undefined>;
  listSurveys(): Promise<Survey[]>;
}

export default iSurveyRepository;
