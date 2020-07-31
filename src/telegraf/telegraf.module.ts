import { Module } from '@nestjs/common';
import { TelegrafModule as NestTelegrafModule } from 'nestjs-telegraf';

const telegramToken = process.env.TELEGRAM_TOKEN;

console.log(`initialize telegram with token: ${telegramToken}`);

@Module({
  imports: [
    NestTelegrafModule.forRoot({
      token: telegramToken,
    }),
  ],
  providers: [],
  exports: [],
})
export class TelegrafModule {}
