import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyReport } from './dailyReport.entity';
import { Repository } from 'typeorm/index';
import { getStartOfToday } from '../../../utils/date';
import { User } from '../user/users.entity';
import { applyChanges } from '../../../utils/object';

@Injectable()
export class DailyReportService {
  constructor(
    @InjectRepository(DailyReport)
    private dailyReportRepo: Repository<DailyReport>,
  ) {}

  createBaseQuery(alias = 'dailyReport') {
    return this.dailyReportRepo
      .createQueryBuilder(alias)
      .leftJoin('dailyReport.user', 'user');
  }

  async getUserTodayDaily(user: User): Promise<DailyReport> {
    const query = this.createBaseQuery();
    query
      .where('dailyReport.user.id = :userId', {
        userId: user.id,
      })
      .andWhere(
        "dailyReport.created_at < date_trunc('day', now()) + interval '1 day' - interval '1 second'",
      )
      .andWhere("dailyReport.created_at > date_trunc('day', now())");
    return query.getOne();
  }

  async deleteDaily(id) {
    await this.dailyReportRepo.delete({ id });
  }

  async createDailyReport(user: User): Promise<DailyReport> {
    const daily = new DailyReport();
    const dailyToday = await this.getUserTodayDaily(user);
    if (dailyToday) {
      await this.deleteDaily(dailyToday.id);
    }
    applyChanges(daily, {
      date: getStartOfToday(),
      creator_id: user.id,
    });
    return this.dailyReportRepo.save(daily);
  }

  async updateDailyReport(
    dailyReport: DailyReport,
    update: Partial<DailyReport>,
  ) {
    const daily = new DailyReport();
    applyChanges(daily, update);
    await this.dailyReportRepo.update(dailyReport.id, daily);
    console.log(daily, update);
    return await this.dailyReportRepo.findOne(dailyReport.id);
  }
}
