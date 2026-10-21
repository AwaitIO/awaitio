import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';
import { sleep } from '../../utils/sleep';

export const sendInvoicesAction = app.defineAction({
  name: 'Send open invoices',
  description: 'Emails every open invoice to its store again.',
  handler: async ({ io, ctx }) => {
    ctx.loading.start({ label: 'Loading open invoices…' });
    const invoices = await db.invoice.findMany({ where: { status: 'open' } });

    const isConfirmed = await io.confirm(`Send ${invoices.length} open invoices?`, {
      helpText: 'Every store gets its invoice by email again.',
    });

    if (!isConfirmed) {
      return 'No invoice was sent.';
    }

    ctx.loading.start({ label: 'Sending invoices…', itemsInQueue: invoices.length });

    for (let index = 0; index < invoices.length; index++) {
      // Stands in for emailing the invoice PDF to the store.
      await sleep({ ms: constants.SEND_INVOICE_LATENCY_MS });
      ctx.loading.completeOne();
    }

    return `Sent ${invoices.length} invoices.`;
  },
});
