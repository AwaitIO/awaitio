import { DateTime } from 'luxon';
import { constants } from '../constants';

export type ToLocalInputValueArgs = {
  iso: string | undefined;
};

// The value is an ISO string in UTC (what the server parses); the input shows and edits it in local time.
export const toLocalInputValue = ({ iso }: ToLocalInputValueArgs) => {
  return iso ? DateTime.fromISO(iso).toLocal().toFormat(constants.LOCAL_INPUT_FORMAT) : undefined;
};
