import User from '../database/models/User';
import AppError from '../errors/AppError';
import createUserDTO from '../dtos/createUserDTO';
import UserRepository from '../database/repositories/implementations/UserRepository';

class CreateUserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email }: createUserDTO): Promise<User> {
    const userWithEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (userWithEmailAlreadyExists) {
      throw new AppError('Email already registered');
    }

    const newUserToCreate = {
      name,
      email,
    };

    const newUser = await this.userRepository.createUser(newUserToCreate);

    return newUser;
  }
}

export default CreateUserService;
