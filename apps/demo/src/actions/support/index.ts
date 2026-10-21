import { closeTicketAction } from './closeTicketAction';
import { replyToTicketAction } from './replyToTicketAction';
import { app } from '../../app';
import { db } from '../../db/db';
import { formatDate } from '../../utils/formatDate';

export const supportPage = app.definePage({
  description: 'Questions and problems stores sent to support.',
  handler: async ({ io }) => {
    const tickets = await db.ticket.findMany({ orderBy: { createdAt: 'desc' } });
    const accounts = await db.account.findMany();
    const open = tickets.filter((ticket) => ticket.status !== 'closed');

    return io.layout.basic({
      title: 'Support',
      description: 'Questions and problems stores sent to support.',
      menuItems: [replyToTicketAction.route()],
      children: [
        io.display.metadata(null, {
          items: [
            { label: 'Open', value: open.length },
            { label: 'High priority', value: open.filter((ticket) => ticket.priority === 'high').length, description: 'Answer today' },
            { label: 'Waiting for the store', value: tickets.filter((ticket) => ticket.status === 'pending').length },
          ],
        }),
        io.display.table('Tickets', {
          data: tickets,
          columns: [
            { label: 'Subject', renderCell: (ticket) => ({ label: ticket.subject, route: replyToTicketAction.route({ params: { id: ticket.id } }) }) },
            { label: 'Store', renderCell: (ticket) => accounts.find((account) => account.id === ticket.accountId)?.name ?? '–' },
            {
              label: 'Priority',
              renderCell: (ticket) => ({
                label: ticket.priority === 'high' ? 'High' : ticket.priority === 'normal' ? 'Normal' : 'Low',
                highlightColor: ticket.priority === 'high' ? 'red' : ticket.priority === 'normal' ? 'blue' : 'gray',
              }),
            },
            {
              label: 'Status',
              renderCell: (ticket) => ({
                label: ticket.status === 'open' ? 'Open' : ticket.status === 'pending' ? 'Waiting for the store' : 'Closed',
                highlightColor: ticket.status === 'open' ? 'orange' : ticket.status === 'pending' ? 'yellow' : 'green',
              }),
            },
            { label: 'Received', renderCell: (ticket) => formatDate({ date: ticket.createdAt }) },
          ],
          rowMenuItems: (ticket) => (ticket.status === 'closed' ? [] : [replyToTicketAction.route({ params: { id: ticket.id } }), closeTicketAction.route({ params: { id: ticket.id } })]),
        }),
      ],
    });
  },
});
