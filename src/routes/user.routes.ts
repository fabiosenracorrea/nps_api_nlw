import { Router } from 'express';

import userInfoChecker from '../middlewares/userInfoChecker';
import UserController from '../controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', userInfoChecker, userController.create);

export default userRoutes;
