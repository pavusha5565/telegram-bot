import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Compliments } from '../compiments/compliments.entity';
import { DailyReport } from '../dailyReport/dailyReport.entity';
import { Commands } from '../../../telegraf/commands';

export enum teamEnum {
  designers = 'designers',
  developers = 'developers',
  projectManager = 'project_manager',
}

class UserFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  activeCommand: Commands;

  @Column()
  chatId: number;

  @Column({ nullable: true })
  team: teamEnum;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
}

@Entity('users')
export class User extends UserFields {
  @OneToMany(
    type => Compliments,
    compliments => compliments.creator_id,
  )
  compliments: Compliments[];

  @OneToMany(
    type => DailyReport,
    dailyReport => dailyReport.user,
  )
  daily_report: DailyReport;
}
