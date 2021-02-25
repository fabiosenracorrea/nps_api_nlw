import User from '../../models/User';

import CreateUserInfo from '../../../dtos/createUserDTO';

interface iUserRepository {
  createUser(userInfo: CreateUserInfo): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default iUserRepository;
