import Survey from '../database/models/Survey';
import AppError from '../errors/AppError';
import CreateSurveyDTO from '../dtos/createSurveyDTO';
import SurveyRepository from '../database/repositories/implementations/SurveyRepository';

class CreateUserService {
  surveyRepository: SurveyRepository;

  constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  async execute({ title, description }: CreateSurveyDTO): Promise<Survey> {
    const surveyToCreate = {
      title,
      description,
    };

    const newSurvey = await this.surveyRepository.createSurvey(surveyToCreate);

    return newSurvey;
  }
}

export default CreateUserService;
