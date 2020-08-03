import { Injectable } from '@nestjs/common';
import {
  TelegrafStart,
  TelegrafHelp,
  TelegrafOn,
  TelegrafHears,
  Context,
  TelegrafCommand,
  TelegrafInlineQuery,
} from 'nestjs-telegraf';
import { UsersService } from '../../database/entities/user/users.service';
import { ComplimentsService } from '../../database/entities/compiments/compliments.service';

@Injectable()
export class UserTelegrafService {
  constructor(
    private readonly userService: UsersService,
    private readonly complimentsService: ComplimentsService,
  ) {}

  @TelegrafStart()
  async start(ctx: Context) {
    const user = await this.userService.getUser(ctx);
    await ctx.reply('Привет: ' + user.firstName);
  }

  @TelegrafCommand('/compliments')
  async say(ctx: Context) {
    const compliments = await this.complimentsService.getRandomCompliment();
    await ctx.reply(compliments?.text);
  }
}
