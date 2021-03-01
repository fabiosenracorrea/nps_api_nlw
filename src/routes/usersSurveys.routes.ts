import { Router } from 'express';

import sendMailInfoChecker from '../middlewares/sendMailInfoChecker';
import UsersSurveysController from '../controllers/UsersSurveysController';

const userSurveysRoutes = Router();

const usersSurveysController = new UsersSurveysController();

userSurveysRoutes.post('/', sendMailInfoChecker, usersSurveysController.create);
userSurveysRoutes.post('/answer/:rating', usersSurveysController.update);

export default userSurveysRoutes;
