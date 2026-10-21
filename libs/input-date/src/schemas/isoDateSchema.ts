import { DateTime } from 'luxon';
import { z } from 'zod/v4';
import { constants } from '../constants';

// Dates travel as 'YYYY-MM-DD'; a DateTime or Date from the handler is turned into one here.
export const isoDateSchema = z.preprocess(
  (value) => {
    // A Date is a moment, so it is read in UTC, the zone the component hands dates back in.
    if (value instanceof Date) {
      return DateTime.fromJSDate(value, { zone: 'utc' }).toISODate();
    }

    // A luxon DateTime, recognized without instanceof so another copy of luxon in the app works too. It keeps its own zone's day.
    if (typeof value === 'object' && value !== null && 'toISODate' in value && typeof value.toISODate === 'function') {
      return value.toISODate();
    }

    return value;
  },
  z
    .string()
    .regex(constants.ISO_DATE_PATTERN, 'not a date in the form YYYY-MM-DD')
    // The pattern checks only the shape; 2026-02-30 has the right shape but is no real date.
    .refine((value) => {
      return DateTime.fromISO(value).isValid;
    }, 'not a real date'),
);
