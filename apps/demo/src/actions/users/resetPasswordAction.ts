import { z } from 'zod/v4';
import { app } from '../../app';
import { db } from '../../db/db';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const resetPasswordAction = app.defineAction({
  name: 'Reset password',
  description: 'Emails a user a link to set a new password.',
  params: z.object({ id: z.string().optional() }),
  handler: async ({ io, ctx }) => {
    const users = await db.user.findMany({ orderBy: { name: 'asc' } });

    const id = await getParamsIdOrSelectRecord({
      id: ctx.params.id,
      selectTitle: 'User',
      options: users.map((user) => ({ label: `${user.name} (${user.email})`, value: user.id })),
      io,
    });

    const user = await db.user.findUniqueOrThrow({ where: { id } });

    const isConfirmed = await io.confirm(`Send a password reset link to ${user.email}?`, {
      helpText: 'Their current password stops working once they set a new one.',
    });

    if (!isConfirmed) {
      return 'No email was sent.';
    }

    return `Sent a reset link to ${user.email}.`;
  },
});
