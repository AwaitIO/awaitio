import { defineComponent } from 'awaitio';
import { Hint, Input } from 'awaitio/ui';
import { DateTime } from 'luxon';
import { z } from 'zod';
import { constants } from './constants';
import { isoDatetimeSchema } from './schemas/isoDatetimeSchema';
import { formatUtc } from './utils/formatUtc';
import { toLocalInputValue } from './utils/toLocalInputValue';

export const inputDatetime = defineComponent({
  props: z.object({
    helpText: z.string().optional(),
    defaultValue: isoDatetimeSchema.optional(),
    min: isoDatetimeSchema.optional(),
    max: isoDatetimeSchema.optional(),
  }),
  // The browser sends an ISO string in UTC; the handler gets a luxon DateTime.
  returns: z
    .string({ required_error: 'pick a date and time' })
    .datetime({ message: 'pick a date and time' })
    // zod checks only the shape; 2026-02-30 has the right shape but is no real date, and would slip past min/max.
    .refine((value) => {
      return DateTime.fromISO(value).isValid;
    }, 'pick a date and time that exists')
    .transform((value) => {
      return DateTime.fromISO(value, { zone: 'utc' });
    }),
  initialValue: (props) => {
    return props.defaultValue ?? '';
  },
  // The input works in whole minutes, so min and max are compared at minute precision: min: DateTime.now() must
  // still accept the current minute that the browser lets the user pick.
  validate: ({ label, props, value }) => {
    if (props.min && value < DateTime.fromISO(props.min).startOf('minute')) {
      return `${label} must not be earlier than ${formatUtc({ iso: props.min })}.`;
    }

    if (props.max && value > DateTime.fromISO(props.max).endOf('minute')) {
      return `${label} must not be later than ${formatUtc({ iso: props.max })}.`;
    }

    return null;
  },
  component: ({ props, value, onChange, disabled, autoFocus, optional }) => {
    return (
      <>
        <Input
          type="datetime-local"
          value={toLocalInputValue({ iso: value }) ?? ''}
          min={toLocalInputValue({ iso: props.min })}
          max={toLocalInputValue({ iso: props.max })}
          required={!optional}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={(local) => {
            const parsed = DateTime.fromFormat(local, constants.LOCAL_INPUT_FORMAT);

            onChange(parsed.isValid ? parsed.toUTC().toISO() ?? '' : '');
          }}
        />
        <Hint>Time zone: {DateTime.local().zoneName}</Hint>
      </>
    );
  },
});
