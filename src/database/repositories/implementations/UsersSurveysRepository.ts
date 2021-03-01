import { getRepository, Repository } from 'typeorm';

import UserSurvey from '../../models/UserSurvey';
import iUsersSurveysRepository from '../definitions/iUsersSurveysRepository';
import { CreateUserSurvey, FindUserSurvey } from '../../../dtos/createUserSurveyDTO';
import { UpdateUserSurveyDTO } from '../../../dtos/updateUserSurveyDTO';

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

  async findById(users_survey_id: string): Promise<UserSurvey | undefined> {
    const userSurvey = await this.repository.findOne(users_survey_id);

    return userSurvey;
  }

  async updateRating({ rating, user_survey_id }: UpdateUserSurveyDTO): Promise<UserSurvey> {
    await this.repository.update(
      {
        id: user_survey_id,
      },
      {
        value: rating,
      },
    );

    const updatedUserSurvey = (await this.findById(user_survey_id)) as UserSurvey;

    return updatedUserSurvey;
  }

  async findByUserAndSurveyId({ survey_id, user_id }: FindUserSurvey): Promise<UserSurvey | undefined> {
    const userSurvey = await this.repository.findOne({
      where: [{ user_id }, { survey_id }, { value: null }],
      relations: ['users', 'surveys'],
    });

    return userSurvey;
  }
}

export default UsersSurveysRepository;
