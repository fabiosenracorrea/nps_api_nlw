import { Request, Response } from 'express';

import CreateSurveyService from '../services/CreateSurveyService';
import SurveyRepository from '../database/repositories/implementations/SurveyRepository';

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveyRepository = new SurveyRepository();
    const createSurveyService = new CreateSurveyService(surveyRepository);

    const surveyToCreate = {
      title,
      description,
    };

    const createdSurvey = await createSurveyService.execute(surveyToCreate);

    return response.status(201).json(createdSurvey);
  }
}

export default SurveyController;
