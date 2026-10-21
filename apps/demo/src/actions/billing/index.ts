import { refundPaymentAction } from './refundPaymentAction';
import { sendInvoicesAction } from './sendInvoicesAction';
import { app } from '../../app';
import { db } from '../../db/db';
import { formatDate } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';

export const billingPage = app.definePage({
  description: 'Invoices of every store, paid, open and refunded.',
  handler: async ({ io }) => {
    const invoices = await db.invoice.findMany({ orderBy: { issuedAt: 'desc' } });
    const accounts = await db.account.findMany();

    return io.layout.basic({
      title: 'Billing',
      description: 'Invoices of every store, paid, open and refunded.',
      menuItems: [sendInvoicesAction.route()],
      children: [
        io.display.metadata(null, {
          items: [
            { label: 'Paid', value: formatMoney({ amount: invoices.filter((invoice) => invoice.status === 'paid').reduce((total, invoice) => total + invoice.amount, 0) }) },
            {
              label: 'Open',
              value: formatMoney({ amount: invoices.filter((invoice) => invoice.status === 'open').reduce((total, invoice) => total + invoice.amount, 0) }),
              description: `${invoices.filter((invoice) => invoice.status === 'open').length} invoices`,
            },
            { label: 'Refunded', value: formatMoney({ amount: invoices.filter((invoice) => invoice.status === 'refunded').reduce((total, invoice) => total + invoice.amount, 0) }) },
          ],
        }),
        io.display.table('Invoices', {
          data: invoices,
          columns: [
            { label: 'Number', accessorKey: 'number' },
            { label: 'Store', renderCell: (invoice) => accounts.find((account) => account.id === invoice.accountId)?.name ?? '–' },
            { label: 'Amount', renderCell: (invoice) => formatMoney({ amount: invoice.amount }) },
            {
              label: 'Status',
              renderCell: (invoice) => ({
                label: invoice.status === 'paid' ? 'Paid' : invoice.status === 'open' ? 'Open' : 'Refunded',
                highlightColor: invoice.status === 'paid' ? 'green' : invoice.status === 'open' ? 'orange' : 'gray',
              }),
            },
            { label: 'Issued', renderCell: (invoice) => formatDate({ date: invoice.issuedAt }) },
          ],
          rowMenuItems: (invoice) => (invoice.status === 'paid' ? [refundPaymentAction.route({ params: { id: invoice.id } })] : []),
        }),
      ],
    });
  },
});
