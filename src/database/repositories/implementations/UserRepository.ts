import { getRepository, Repository } from 'typeorm';

import User from '../../models/User';
import iUserRepository from '../definitions/iUserRepository';
import CreateUserInfo from '../../../dtos/createUserDTO';

class UserRepository implements iUserRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async createUser(userInfo: CreateUserInfo) {
    const user = this.repository.create(userInfo);

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      email,
    });

    return user;
  }
}

export default UserRepository;
