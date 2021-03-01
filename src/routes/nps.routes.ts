import { Router } from 'express';

import NpsController from '../controllers/NpsController';

const userRoutes = Router();

const npsController = new NpsController();

userRoutes.get('/:survey_id', npsController.show);

export default userRoutes;
