import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';
import Survey from './Survey';

@Entity('users_surveys')
class UserSurvey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column('integer')
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserSurvey;
