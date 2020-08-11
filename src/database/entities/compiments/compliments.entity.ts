import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/users.entity';

export enum Sex {
  MAN = 'man',
  WOMAN = 'woman',
}

class ComplimentsFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sex: Sex;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  creator_id: number;
}

@Entity('compliments')
export class Compliments extends ComplimentsFields {
  @ManyToOne(
    type => User,
    user => user.compliments,
  )
  @JoinColumn({
    name: 'creator_id',
  })
  user?: User;
}
