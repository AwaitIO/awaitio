import { defineComponent } from 'awaitio';
import { Input } from 'awaitio/ui';
import { DateTime } from 'luxon';
import { z } from 'zod';
import { constants } from './constants';
import { isoDateSchema } from './schemas/isoDateSchema';

export const inputDate = defineComponent({
  props: z.object({
    helpText: z.string().optional(),
    defaultValue: isoDateSchema.optional(),
    min: isoDateSchema.optional(),
    max: isoDateSchema.optional(),
  }),
  // The browser sends 'YYYY-MM-DD'; the handler gets a luxon DateTime at the start of that day in UTC.
  returns: z
    .string({ required_error: 'pick a date' })
    .regex(constants.ISO_DATE_PATTERN, 'pick a date')
    // The pattern checks only the shape; 2026-02-30 has the right shape but is no real date, and would slip past min/max.
    .refine((value) => {
      return DateTime.fromISO(value).isValid;
    }, 'pick a date that exists')
    .transform((value) => {
      return DateTime.fromISO(value, { zone: 'utc' }).startOf('day');
    }),
  initialValue: (props) => {
    return props.defaultValue ?? '';
  },
  validate: ({ label, props, value }) => {
    if (props.min && value < DateTime.fromISO(props.min, { zone: 'utc' })) {
      return `${label} must not be earlier than ${props.min}.`;
    }

    if (props.max && value > DateTime.fromISO(props.max, { zone: 'utc' })) {
      return `${label} must not be later than ${props.max}.`;
    }

    return null;
  },
  component: ({ props, value, onChange, disabled, autoFocus, optional }) => {
    return <Input type="date" value={value} onChange={onChange} min={props.min} max={props.max} required={!optional} disabled={disabled} autoFocus={autoFocus} />;
  },
});
