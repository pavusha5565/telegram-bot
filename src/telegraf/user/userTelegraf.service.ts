import { Injectable } from '@nestjs/common';
import {
  TelegrafStart,
  TelegrafHelp,
  TelegrafOn,
  TelegrafHears,
  Context,
} from 'nestjs-telegraf';
import { UserService } from '../../database/entities/user/user.service';

@Injectable()
export class UserTelegrafService {
  constructor(private readonly userService: UserService) {}

  @TelegrafStart()
  async start(ctx: Context) {
    const user = await this.userService.getUser(ctx);
    ctx.reply('Привет: ' + user.firstName);
  }
}
