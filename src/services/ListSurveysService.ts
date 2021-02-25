import Survey from '../database/models/Survey';
import SurveyRepository from '../database/repositories/implementations/SurveyRepository';

class CreateUserService {
  surveyRepository: SurveyRepository;

  constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  async execute(): Promise<Survey[]> {
    const surveys = await this.surveyRepository.listSurveys();

    return surveys;
  }
}

export default CreateUserService;
