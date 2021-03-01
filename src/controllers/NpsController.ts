import { Request, Response } from 'express';

import CalculateNPSService from '../services/CalculateNPSService';
import SurveyRepository from '../database/repositories/implementations/SurveyRepository';
import UsersSurveysRepository from '../database/repositories/implementations/UsersSurveysRepository';

class NPSController {
  async show(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveyRepository = new SurveyRepository();
    const usersSurveysRepository = new UsersSurveysRepository();
    const calculateNPSService = new CalculateNPSService(surveyRepository, usersSurveysRepository);

    const surveyWithNPS = await calculateNPSService.execute({ survey_id });

    return response.status(200).json(surveyWithNPS);
  }
}

export default NPSController;
