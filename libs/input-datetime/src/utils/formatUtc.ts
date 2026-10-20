import { DateTime } from 'luxon';

export type FormatUtcArgs = {
  iso: string;
};

export const formatUtc = ({ iso }: FormatUtcArgs) => {
  return `${DateTime.fromISO(iso, { zone: 'utc' }).toFormat('yyyy-MM-dd HH:mm')} UTC`;
};
