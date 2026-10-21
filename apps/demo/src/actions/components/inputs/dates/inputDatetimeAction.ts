import { DateTime } from 'luxon';
import { app } from '../../../../app';

export const inputDatetimeAction = app.defineAction({
  name: 'Input datetime',
  description: 'io.input.datetime asks for a date and a time.',
  handler: async ({ io }) => {
    const endsAt = await io.input.datetime('Trial ends at', {
      defaultValue: DateTime.now().plus({ days: 14 }).startOf('day'),
      min: DateTime.now(),
    });

    return { endsAt: endsAt.toISO() };
  },
});
