import { startOfDay } from 'date-fns';

export function getStartOfToday(date: Date = new Date()) {
  const parsedDate = startOfDay(date);
  if (!parsedDate) {
    return date;
  }
  return parsedDate;
}
