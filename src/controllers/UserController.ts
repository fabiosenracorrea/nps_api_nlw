import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import UserRepository from '../database/repositories/implementations/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const userRepository = new UserRepository();
    const createUserService = new CreateUserService(userRepository);

    const userInfoToCreate = {
      name,
      email,
    };

    const createdUser = await createUserService.execute(userInfoToCreate);

    return response.status(201).json(createdUser);
  }
}

export default UserController;
