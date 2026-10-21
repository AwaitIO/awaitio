import { z } from 'zod/v4';
import { app } from '../../app';
import { db } from '../../db/db';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const suspendAccountAction = app.defineAction({
  name: 'Suspend account',
  description: 'Takes a store offline, for example after unpaid invoices.',
  params: z.object({ id: z.string().optional() }),
  handler: async ({ io, ctx }) => {
    const accounts = await db.account.findMany({ orderBy: { name: 'asc' } });

    const id = await getParamsIdOrSelectRecord({
      id: ctx.params.id,
      selectTitle: 'Store',
      options: accounts.filter((account) => account.status !== 'suspended').map((account) => ({ label: account.name, value: account.id })),
      io,
    });

    const account = await db.account.findUniqueOrThrow({ where: { id } });
    const openInvoices = await db.invoice.count({ where: { accountId: id, status: 'open' } });

    const reason = await io.input.textarea('Reason', {
      helpText: `${account.name} has ${openInvoices} open invoice${openInvoices === 1 ? '' : 's'}. The owner sees this reason.`,
      lines: 3,
    });

    const isConfirmed = await io.confirm(`Suspend ${account.name}?`, {
      helpText: 'The store goes offline for its customers right away.',
    });

    if (!isConfirmed) {
      return `${account.name} stays online.`;
    }

    await db.account.update({ where: { id }, data: { status: 'suspended' } });

    return { suspended: account.name, notified: account.ownerEmail, reason, by: ctx.user.name };
  },
});
