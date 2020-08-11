import { Module } from '@nestjs/common';
import { UserTelegrafModule } from './user/userTelegraf.module';
import { DailyReportTelegraf } from './dailyReport/dailyReport.module';

@Module({
  imports: [DailyReportTelegraf, UserTelegrafModule],
})
export class TelegramResolvers {}
