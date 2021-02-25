import { Router } from 'express';

import surveyInfoChecker from '../middlewares/surveyInfoChecker';
import SurveyController from '../controllers/SurveyController';

const userRoutes = Router();

const surveyController = new SurveyController();

userRoutes.get('/', surveyController.show);
userRoutes.post('/', surveyInfoChecker, surveyController.create);

export default userRoutes;
