import { Context } from 'telegraf';
import { User } from '../database/entities/user/users.entity';
import { Commands } from '../telegraf/commands';

export async function getUserInfo(ctx: Context): Promise<Partial<User>> {
  let chat = ctx.chat;
  if (!chat) {
    chat = await ctx.getChat();
  }
  return {
    chatId: chat.id,
    firstName: chat.first_name,
    lastName: chat.last_name,
    username: chat.username,
  };
}

export function getMessageText(ctx: Context): string {
  return ctx.message.text;
}

export function getUserActiveCommand(user: User): Commands {
  return user.activeCommand;
}
