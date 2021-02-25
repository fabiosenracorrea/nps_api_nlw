import { Router } from 'express';

import userRoutes from './user.routes';
import surveyRoutes from './survey.routes';

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/surveys', surveyRoutes);

export default appRoutes;
