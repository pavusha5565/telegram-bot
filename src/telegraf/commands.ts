export enum Commands {
  HELP = '/help',
  COMPLIMENTS = '/compliments',
}

export const commandsDescription = {
  [Commands.HELP]: 'Получение справки по коммандам',
  [Commands.COMPLIMENTS]: 'Получение комплимента от бота',
};
