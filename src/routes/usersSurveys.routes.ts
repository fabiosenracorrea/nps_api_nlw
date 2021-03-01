import { Router } from 'express';

import sendMailInfoChecker from '../middlewares/sendMailInfoChecker';
import UsersSurveysController from '../controllers/UsersSurveysController';

const userSurveysRoutes = Router();

const usersSurveysController = new UsersSurveysController();

userSurveysRoutes.get('/answer/:rating', usersSurveysController.update);
userSurveysRoutes.post('/', sendMailInfoChecker, usersSurveysController.create);

export default userSurveysRoutes;
