export enum dailySteps {
  YESTERDAY = 'yesterday',
  TODAY = 'today',
  BLOCKERS = 'blockers',
  DONE = 'done',
}

export const dailyMessage = {
  [dailySteps.YESTERDAY]: 'Что ты делал вчера?',
  [dailySteps.TODAY]: 'Что ты сделаешь сегодня?',
  [dailySteps.BLOCKERS]: 'У тебя есть какие нибудь блокеры?',
  done: 'Все сделанно, поздравляю.',
};

export function getStepMessage(step: dailySteps) {
  return dailyMessage[step] || dailyMessage.done;
}

export function getStep(dailyReport): dailySteps {
  const steps = Object.keys(dailySteps);
  for (const step of steps) {
    const value = dailySteps[step];
    if (!dailyReport[value]) {
      return value;
    }
  }
  return dailySteps.DONE;
}

export function getMessageNextStep(step: dailySteps): string {
  const steps = Object.keys(dailyMessage);
  const index = steps.findIndex(s => s === step);
  return dailyMessage[steps[index + 1]] || dailyMessage.done;
}
