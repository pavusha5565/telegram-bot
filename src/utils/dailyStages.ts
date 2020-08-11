export enum dailySteps {
  YESTERDAY = 'yesterday',
  TODAY = 'today',
  BLOCKERS = 'blockers',
  DONE = 'done',
}

export const dailyMessage = {
  [dailySteps.YESTERDAY]: 'Что ты делал вчера?',
  [dailySteps.TODAY]: 'Что ты делал сегодня?',
  [dailySteps.BLOCKERS]: 'У тебя есть какие нибудь блокеры?',
  done: 'Все сделанно, поздравляю.',
  undefined: 'Для создания отчета нужно написать /daily',
};

export function getStepMessage(step: string) {
  return dailyMessage[step] || dailyMessage.done;
}

export function getStep(dailyReport): string | null {
  const steps = Object.keys(dailySteps);
  for (const step of steps) {
    const value = dailySteps[step];
    if (!dailyReport[value]) {
      return value;
    }
  }
  return dailySteps.DONE;
}
