import { Module } from '@nestjs/common';
import { UserTelegrafModule } from './user/userTelegraf.module';

@Module({
  imports: [UserTelegrafModule],
})
export class TelegramResolvers {}
