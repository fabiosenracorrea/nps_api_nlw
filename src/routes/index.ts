import { Router } from 'express';

import userRoutes from './user.routes';
import surveyRoutes from './survey.routes';
import usersSurveysRoutes from './usersSurveys.routes';

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/surveys', surveyRoutes);
appRoutes.use('/launch', usersSurveysRoutes);

export default appRoutes;
