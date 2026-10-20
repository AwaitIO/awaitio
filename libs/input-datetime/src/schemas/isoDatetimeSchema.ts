import { DateTime } from 'luxon';
import { z } from 'zod';

// Times travel as ISO 8601 strings in UTC; a DateTime or Date from the handler is turned into one here.
export const isoDatetimeSchema = z.preprocess(
  (value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }

    // A luxon DateTime, recognized without instanceof so another copy of luxon in the app works too.
    if (typeof value === 'object' && value !== null && 'toUTC' in value && typeof value.toUTC === 'function') {
      return value.toUTC().toISO();
    }

    return value;
  },
  z
    .string()
    .datetime()
    // zod checks only the shape; 2026-02-30 has the right shape but is no real date.
    .refine((value) => {
      return DateTime.fromISO(value).isValid;
    }, 'not a real date and time'),
);
