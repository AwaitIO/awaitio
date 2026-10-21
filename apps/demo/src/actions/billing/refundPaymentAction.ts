import { z } from 'zod/v4';
import { app } from '../../app';
import { db } from '../../db/db';
import { formatDate } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';

export const refundPaymentAction = app.defineAction({
  name: 'Refund payment',
  description: 'Returns all or part of a paid invoice to the store.',
  params: z.object({ id: z.string().optional() }),
  handler: async ({ io, ctx }) => {
    const invoice = ctx.params.id
      ? await db.invoice.findUniqueOrThrow({ where: { id: ctx.params.id } })
      : (
          await io.select.table('Invoice to refund', {
            data: await db.invoice.findMany({ where: { status: 'paid' }, orderBy: { issuedAt: 'desc' } }),
            columns: [
              { label: 'Number', accessorKey: 'number' },
              { label: 'Amount', renderCell: (row) => formatMoney({ amount: row.amount }) },
              { label: 'Issued', renderCell: (row) => formatDate({ date: row.issuedAt }) },
            ],
          })
        )[0];

    if (!invoice) {
      return 'No invoice was picked.';
    }

    const account = await db.account.findUniqueOrThrow({ where: { id: invoice.accountId } });

    const { amount, reason } = await io.group({
      amount: io.input.number('Amount in USD', { defaultValue: invoice.amount, min: 1, max: invoice.amount, decimals: 2 }),
      reason: io.input.textarea('Reason', { helpText: 'Shown on the credit note.', lines: 3 }),
    });

    const isConfirmed = await io.confirm(`Refund ${formatMoney({ amount })} to ${account.name}?`, {
      helpText: `Invoice ${invoice.number} for ${formatMoney({ amount: invoice.amount })}.`,
    });

    if (!isConfirmed) {
      return 'Nothing was refunded.';
    }

    await db.invoice.update({ where: { id: invoice.id }, data: { status: 'refunded' } });

    return { refunded: formatMoney({ amount }), invoice: invoice.number, store: account.name, reason };
  },
});
