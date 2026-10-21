import { z } from 'zod/v4';

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
  // Refuses a date that does not exist (2026-02-30) too, not only a wrong shape.
  z.iso.datetime(),
);
