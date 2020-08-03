import { Context } from 'telegraf';
import { User } from '../database/entities/user/users.entity';

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
