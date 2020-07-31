import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Context } from 'telegraf';
import { getUserInfo } from '../../../utils/data';
import { applyChanges } from '../../../utils/object';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(ctx: Context): Promise<User> {
    const userInfo = await getUserInfo(ctx);
    let user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.chatId = :chatId', { chatId: userInfo.chatId })
      .getOne();
    if (!user) {
      user = await this.create(userInfo);
    }
    return user;
  }

  async create(userInfo: Partial<User>): Promise<User> {
    const newUser = new User();
    applyChanges(newUser, userInfo);
    return await this.usersRepository.save(newUser);
  }

  async getUserActiveCommand(ctx: Context): Promise<string> {
    let user = await this.getUser(ctx);
    return user.activeCommand;
  }

  async updateUserActiveCommand(
    ctx: Context,
    command: string,
  ): Promise<string> {
    let user = await this.getUser(ctx);

    const updated = await this.usersRepository.update(user, {
      activeCommand: command,
    });
    return updated.raw.activeCommand;
  }
}
