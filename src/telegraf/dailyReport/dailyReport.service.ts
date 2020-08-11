import { Injectable } from '@nestjs/common';
import { DailyReportService } from '../../database/entities/dailyReport/dailyReport.service';
import { Context, TelegrafCommand } from 'nestjs-telegraf';
import { Commands } from '../commands';
import { UsersService } from '../../database/entities/user/users.service';
import { DailyReport } from '../../database/entities/dailyReport/dailyReport.entity';
import { applyChanges } from '../../utils/object';
import { getMessageText } from '../../utils/data';
import { getStep, getStepMessage } from '../../utils/dailyStages';
import { InjectEventEmitter } from 'nest-emitter';
import { MyEventEmitter } from '../../app.events';

@Injectable()
export class DailyReportTelegrafService {
  constructor(
    @InjectEventEmitter() private readonly emitter: MyEventEmitter,
    private readonly dailyReportService: DailyReportService,
    private readonly usersService: UsersService,
  ) {}
  onModuleInit() {
    this.emitter.on(
      Commands.DAILY,
      async (ctx: Context) => await this.nextStepOfDaily(ctx),
    );
  }

  @TelegrafCommand(Commands.DAILY)
  async initializeDaily(ctx: Context) {
    const user = await this.usersService.getUser(ctx);
    const newDaily = await this.dailyReportService.createDailyReport(user);
    await this.usersService.updateUserActiveCommand(user, Commands.DAILY);
    const step = getStep(newDaily);
    await ctx.reply(getStepMessage(step));
  }

  async nextStepOfDaily(ctx: Context) {
    const user = await this.usersService.getUser(ctx);
    const daily = await this.dailyReportService.getUserTodayDaily(user);
    if (!daily) {
      return ctx.reply('Для создания отчета нужно ввести /daily');
    }
    const currentStep = getStep(daily);
    const nextDaily = new DailyReport();
    applyChanges(nextDaily, { [currentStep]: getMessageText(ctx) });
    await this.dailyReportService.updateDailyReport(daily, nextDaily);
    await ctx.reply(getStepMessage(currentStep));
  }
}
