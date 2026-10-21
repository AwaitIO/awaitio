import { z } from 'zod/v4';
import { app } from '../../app';
import { db } from '../../db/db';
import { formatDate } from '../../utils/formatDate';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const extendTrialAction = app.defineAction({
  name: 'Extend trial',
  description: 'Gives a store on trial more days before its first invoice.',
  params: z.object({ id: z.string().optional() }),
  handler: async ({ io, ctx }) => {
    const accounts = await db.account.findMany({ where: { status: 'trial' } });

    const id = await getParamsIdOrSelectRecord({
      id: ctx.params.id,
      selectTitle: 'Store on trial',
      options: accounts.map((account) => ({ label: `${account.name} (until ${formatDate({ date: account.trialEndsAt })})`, value: account.id })),
      io,
    });

    const account = await db.account.findUniqueOrThrow({ where: { id } });
    const days = await io.input.number('Extra days', { defaultValue: 7, min: 1, max: 30, helpText: `The trial now ends on ${formatDate({ date: account.trialEndsAt })}.` });

    const trialEndsAt = new Date((account.trialEndsAt ?? new Date()).getTime() + days * 24 * 60 * 60 * 1000);
    const updated = await db.account.update({ where: { id }, data: { trialEndsAt } });

    return `The trial of ${updated.name} now ends on ${formatDate({ date: trialEndsAt })}.`;
  },
});
