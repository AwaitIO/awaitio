import { z } from 'zod/v4';
import { app } from '../../app';
import { db } from '../../db/db';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const replyToTicketAction = app.defineAction({
  name: 'Reply to ticket',
  description: 'Answers a store and sets what happens with the ticket next.',
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

    const { reply, waitForStore } = await io.group({
      message: io.display.markdown(`**${ticket.requesterEmail}** wrote:\n\n${ticket.message}`),
      reply: io.input.textarea('Your reply', { defaultValue: `Hi,\n\n\n\nBest,\n${ctx.user.name}`, lines: 8, minLength: 10 }),
      waitForStore: io.input.boolean('Waiting for the store', { helpText: 'Keep the ticket open until the store answers.', defaultValue: true }),
    });

    await db.ticket.update({ where: { id }, data: { status: waitForStore ? 'pending' : 'closed' } });

    return { repliedTo: ticket.requesterEmail, subject: ticket.subject, ticket: waitForStore ? 'Waiting for the store' : 'Closed', length: `${reply.length} characters` };
  },
});
