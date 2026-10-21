import { DateTime } from 'luxon';
import { app } from '../../app';

export const groupAction = app.defineAction({
  name: 'Group',
  description: 'io.group asks for several values on one screen.',
  handler: async ({ io }) => {
    const { company, endsAt, note } = await io.group({
      company: io.input.text('Company name', { placeholder: 'Acme Inc.' }),
      endsAt: io.input.datetime('Trial ends at', { defaultValue: DateTime.now().plus({ days: 14 }).startOf('day') }),
      note: io.input.textarea('Note for the team', { lines: 5 }),
    });

    return { company, endsAt: endsAt.toISO(), note };
  },
});
