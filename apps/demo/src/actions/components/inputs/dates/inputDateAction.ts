import { DateTime } from 'luxon';
import { app } from '../../../../app';

export const inputDateAction = app.defineAction({
  name: 'Input date',
  description: 'io.input.date asks for a calendar date, without a time.',
  handler: async ({ io }) => {
    const dueOn = await io.input.date('Due date', {
      defaultValue: DateTime.now().plus({ days: 14 }),
      min: DateTime.now(),
    });

    return { dueOn: dueOn.toISODate() };
  },
});
