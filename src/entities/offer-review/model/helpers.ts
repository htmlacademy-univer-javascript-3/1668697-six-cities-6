import { MONTHS } from './constants';

export const getFormattedDate = (dateTime: string) => {
  const date = new Date(dateTime);

  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
