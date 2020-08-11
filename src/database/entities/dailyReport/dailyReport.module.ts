import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReport } from './dailyReport.entity';
import { DailyReportService } from './dailyReport.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyReport])],
  providers: [DailyReportService],
  exports: [TypeOrmModule, DailyReportService],
})
export class DailyReportModule {}
