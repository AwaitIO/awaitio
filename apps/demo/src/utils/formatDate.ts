import { DateTime } from 'luxon';

export type FormatDateArgs = {
  date: Date | null;
};

export const formatDate = ({ date }: FormatDateArgs) => {
  return date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED, { locale: 'en-US' }) : '–';
};
