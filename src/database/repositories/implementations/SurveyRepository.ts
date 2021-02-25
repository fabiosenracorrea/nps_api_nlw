import { getRepository, Repository } from 'typeorm';

import Survey from '../../models/Survey';
import iSurveyRepository from '../definitions/iSurveyRepository';
import CreateSurveyDTO from '../../../dtos/createSurveyDTO';

class SurveyRepository implements iSurveyRepository {
  repository: Repository<Survey>;

  constructor() {
    this.repository = getRepository(Survey);
  }

  async createSurvey(surveyInfo: CreateSurveyDTO) {
    const survey = this.repository.create(surveyInfo);

    await this.repository.save(survey);

    return survey;
  }

  async listSurveys() {
    const surveys = await this.repository.find();

    return surveys;
  }
}

export default SurveyRepository;
