import Survey from '../../models/Survey';

import CreateSurveyDTO from '../../../dtos/createSurveyDTO';

interface iSurveyRepository {
  createSurvey(surveyInfo: CreateSurveyDTO): Promise<Survey>;
  listSurveys(): Promise<Survey[]>;
}

export default iSurveyRepository;
