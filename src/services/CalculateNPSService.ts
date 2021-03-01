import path from 'path';

import AppError from '../errors/AppError';
import { CalculateNPS } from '../dtos/calculateNPSdto';
import UserSurvey from '../database/models/UserSurvey';

import SurveyRepository from '../database/repositories/implementations/SurveyRepository';
import UsersSurveysRepository from '../database/repositories/implementations/UsersSurveysRepository';
import MailProvider from '../providers/SendMail';

interface SurveyInfo {
  passives: number;
  detractors: number;
  promoters: number;
  total: number;
}

interface SurveyWithNPS extends SurveyInfo {
  nps: number;
}

const baseSurveyInfo = {
  passives: 0,
  detractors: 0,
  promoters: 0,
  total: 0,
};

class CalculateNPSService {
  surveyRepository: SurveyRepository;

  userSurveyRepository: UsersSurveysRepository;

  mailProvider: MailProvider;

  constructor(surveyRepository: SurveyRepository, userSurveyRepository: UsersSurveysRepository) {
    this.surveyRepository = surveyRepository;
    this.userSurveyRepository = userSurveyRepository;
  }

  async execute({ survey_id }: CalculateNPS): Promise<SurveyWithNPS> {
    const survey = await this.surveyRepository.findById(survey_id);

    if (!survey) {
      throw new AppError('Survey not found', 404);
    }

    const allSurveyAnswers = await this.userSurveyRepository.findAllSurveyAnswers(survey_id);

    const { detractors, passives, promoters, total } = allSurveyAnswers.reduce(
      (accumulatedInfo, nextUserSurvey) => {
        const infoToUpdate = { ...accumulatedInfo };

        const validAnswer = Number.isInteger(nextUserSurvey.value);

        if (!validAnswer) return infoToUpdate;

        const isDetractor = nextUserSurvey.value >= 0 && nextUserSurvey.value <= 6;
        const isPromoter = nextUserSurvey.value >= 9 && nextUserSurvey.value <= 10;
        const isPassive = nextUserSurvey.value >= 7 && nextUserSurvey.value <= 8;

        if (isDetractor) infoToUpdate.detractors += 1;
        if (isPromoter) infoToUpdate.promoters += 1;
        if (isPassive) infoToUpdate.passives += 1;

        infoToUpdate.total += 1;

        return infoToUpdate;
      },
      baseSurveyInfo,
    );

    const nps = ((promoters - detractors) / total) * 100;

    const normalizedNps = Number(nps.toFixed(2));

    const surveyInfo = {
      promoters,
      passives,
      detractors,
      total,
      nps: normalizedNps,
    };

    return surveyInfo;
  }
}

export default CalculateNPSService;
