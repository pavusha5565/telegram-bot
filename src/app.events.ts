import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'nest-emitter';
import { Context } from 'nestjs-telegraf';
import { Commands } from './telegraf/commands';

export interface AppEvents {
  [Commands.DAILY]: Context;
  [Commands.COMPLIMENTS]: Context;
}

export type MyEventEmitter = StrictEventEmitter<EventEmitter, AppEvents>;
