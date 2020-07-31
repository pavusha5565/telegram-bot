import 'dotenv/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TelegrafModule } from './telegraf/telegraf.module';
import { TelegramResolvers } from './telegraf/resolvers.module';

@Module({
  imports: [DatabaseModule, TelegrafModule, TelegramResolvers],
})
export class AppModule {}
