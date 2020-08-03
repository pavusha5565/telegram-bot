import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Compliments } from '../compiments/compliments.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  activeCommand: string;

  @Column()
  chatId: number;

  @OneToMany(
    type => Compliments,
    compliments => compliments.creator_id,
  )
  compliments: Compliments[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
}
