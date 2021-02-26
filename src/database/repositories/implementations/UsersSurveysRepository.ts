import { getRepository, Repository } from 'typeorm';

import UserSurvey from '../../models/UserSurvey';
import iUsersSurveysRepository from '../definitions/iUsersSurveysRepository';
import { CreateUserSurvey } from '../../../dtos/createUserSurveyDTO';

class UsersSurveysRepository implements iUsersSurveysRepository {
  repository: Repository<UserSurvey>;

  constructor() {
    this.repository = getRepository(UserSurvey);
  }

  async createRating(ratingInfo: CreateUserSurvey) {
    const rating = this.repository.create(ratingInfo);

    await this.repository.save(rating);

    return rating;
  }
}

export default UsersSurveysRepository;
