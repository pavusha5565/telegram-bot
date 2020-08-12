import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'nest-emitter';
import { Context } from 'nestjs-telegraf';
import { Commands } from './telegraf/commands';

export interface AppEvents {
  testReq: string;
}

export type TelegramCommandEventEmiter = StrictEventEmitter<
  EventEmitter,
  AppEvents
>;
