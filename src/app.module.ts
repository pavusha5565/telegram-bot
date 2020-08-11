import 'dotenv/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TelegrafModule } from './telegraf/telegraf.module';
import { TelegramResolvers } from './telegraf/resolvers.module';
import { NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'events';

@Module({
  imports: [
    NestEmitterModule.forRoot(new EventEmitter()),
    DatabaseModule,
    TelegrafModule,
    TelegramResolvers,
  ],
})
export class AppModule {}
