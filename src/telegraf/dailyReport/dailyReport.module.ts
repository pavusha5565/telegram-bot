import { Module } from '@nestjs/common';
import { DailyReportModule } from '../../database/entities/dailyReport/dailyReport.module';
import { UsersModule } from '../../database/entities/user/users.module';
import { DailyReportTelegrafService } from './dailyReport.service';

@Module({
  imports: [DailyReportModule, UsersModule],
  providers: [DailyReportTelegrafService],
})
export class DailyReportTelegraf {}
