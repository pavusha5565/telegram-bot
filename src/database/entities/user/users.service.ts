import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Context } from 'telegraf';
import { getUserActiveCommand, getUserInfo } from '../../../utils/data';
import { applyChanges } from '../../../utils/object';
import { Commands } from '../../../telegraf/commands';

@Injectable()
export class UsersService {
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

  async getActiveCommandByContext(ctx: Context): Promise<Commands> {
    const user = await this.getUser(ctx);
    return getUserActiveCommand(user);
  }

  async updateUserActiveCommand(
    user: User,
    command: Commands | null = null,
  ): Promise<Commands> {
    await this.usersRepository.update(user.id, {
      activeCommand: command,
    });
    const userCatched = await this.usersRepository.findOne(user.id);
    return userCatched.activeCommand;
  }
}
