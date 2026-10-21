import { z } from 'zod/v4';
import { app } from '../../app';
import { db } from '../../db/db';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const closeTicketAction = app.defineAction({
  name: 'Close ticket',
  description: 'Closes a ticket that needs no more answers.',
  params: z.object({ id: z.string().optional() }),
  handler: async ({ io, ctx }) => {
    const tickets = await db.ticket.findMany({ orderBy: { createdAt: 'desc' } });

    const id = await getParamsIdOrSelectRecord({
      id: ctx.params.id,
      selectTitle: 'Ticket',
      options: tickets.filter((ticket) => ticket.status !== 'closed').map((ticket) => ({ label: ticket.subject, value: ticket.id })),
      io,
    });

    const ticket = await db.ticket.findUniqueOrThrow({ where: { id } });

    const isConfirmed = await io.confirm(`Close "${ticket.subject}"?`, { helpText: `${ticket.requesterEmail} can still reopen it by replying.` });

    if (!isConfirmed) {
      return 'The ticket stays open.';
    }

    await db.ticket.update({ where: { id }, data: { status: 'closed' } });

    return `Closed "${ticket.subject}".`;
  },
});
