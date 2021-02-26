export interface CreateUserSurvey {
  user_id: string;
  survey_id: string;
  value?: number;
}

export interface SendMailServiceDTO {
  email: string;
  survey_id: string;
}
