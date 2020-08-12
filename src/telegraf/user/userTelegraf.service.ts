import { Injectable } from '@nestjs/common';
import {
  TelegrafStart,
  Context,
  TelegrafCommand,
  TelegrafHears,
} from 'nestjs-telegraf';
import { Commands } from '../commands';
import { UsersService } from '../../database/entities/user/users.service';
import { ComplimentsService } from '../../database/entities/compiments/compliments.service';
import { getUserActiveCommand } from '../../utils/data';
import { TelegramCommandEventEmiter } from '../../app.events';
import { InjectEventEmitter } from 'nest-emitter';

@Injectable()
export class UserTelegrafService {
  constructor(
    private readonly userService: UsersService,
    private readonly complimentsService: ComplimentsService,
    @InjectEventEmitter() private readonly emitter: TelegramCommandEventEmiter,
  ) {}

  @TelegrafStart()
  async start(ctx: Context) {
    const user = await this.userService.getUser(ctx);
    await ctx.reply('Привет: ' + user.firstName);
  }

  @TelegrafCommand(Commands.COMPLIMENTS)
  async say(ctx: Context) {
    const compliments = await this.complimentsService.getRandomCompliment();
    const user = await this.userService.getUser(ctx);
    await this.userService.updateUserActiveCommand(user, Commands.COMPLIMENTS);
    await ctx.reply(
      user.firstName +
        ', ' +
        compliments?.text.charAt(0).toLowerCase() +
        compliments?.text.slice(1),
    );
  }

  @TelegrafHears(/.*/)
  async hearsMessage(ctx: Context) {
    const user = await this.userService.getUser(ctx);
    const activeCommand = getUserActiveCommand(user);
    switch (activeCommand) {
      case Commands.DAILY: {
        this.emitter.emit(activeCommand, ctx);
        break;
      }
      default: {
        throw new Error('delegate not to emited in function hearsMessage');
      }
    }
  }
}
