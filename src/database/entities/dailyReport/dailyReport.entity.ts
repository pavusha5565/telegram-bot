import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { User } from '../user/users.entity';

class DailyReportFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  yesterday: string;

  @Column({ nullable: true })
  today: string;

  @Column({ nullable: true })
  blockers: string;

  @Column()
  creator_id: number;

  @Column()
  date: Date;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}

@Entity('daily_report')
export class DailyReport extends DailyReportFields {
  @ManyToOne(
    type => User,
    user => user.daily_report,
  )
  @JoinColumn({
    name: 'creator_id',
  })
  user: User;
}
