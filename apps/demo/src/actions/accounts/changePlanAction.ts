import { z } from 'zod/v4';
import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const changePlanAction = app.defineAction({
  name: 'Change plan',
  description: 'Moves a store to another plan from its next invoice.',
  params: z.object({ id: z.string().optional() }),
  handler: async ({ io, ctx }) => {
    const accounts = await db.account.findMany({ orderBy: { name: 'asc' } });

    const id = await getParamsIdOrSelectRecord({
      id: ctx.params.id,
      selectTitle: 'Store',
      options: accounts.map((account) => ({ label: account.name, value: account.id })),
      io,
    });

    const account = await db.account.findUniqueOrThrow({ where: { id } });

    const plan = await io.select.single(`New plan for ${account.name}`, {
      options: constants.PLANS.filter((option) => option.value !== account.plan),
    });

    const isConfirmed = await io.confirm(`Move ${account.name} to ${plan.label}?`, {
      helpText: 'The new price applies from the next invoice.',
    });

    if (!isConfirmed) {
      return 'The plan stays as it was.';
    }

    const updated = await db.account.update({ where: { id }, data: { plan: plan.value } });

    return `${updated.name} is on ${plan.label} from the next invoice.`;
  },
});
