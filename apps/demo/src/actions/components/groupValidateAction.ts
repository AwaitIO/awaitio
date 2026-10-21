import { app } from '../../app';

export const groupValidateAction = app.defineAction({
  name: 'Group validation',
  description: 'io.group with a check across fields.',
  handler: async ({ io }) => {
    const { code, startsAt, endsAt } = await io
      .group({
        code: io.input.text('Discount code'),
        startsAt: io.input.date('Starts on'),
        endsAt: io.input.date('Ends on'),
      })
      .validate(({ startsAt, endsAt }) => {
        return endsAt > startsAt ? undefined : 'The code must end after it starts.';
      });

    return { code, startsOn: startsAt.toISODate(), endsOn: endsAt.toISODate() };
  },
});
