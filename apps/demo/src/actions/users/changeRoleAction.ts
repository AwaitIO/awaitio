import { z } from 'zod/v4';
import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';
import { getParamsIdOrSelectRecord } from '../../utils/getParamsIdOrSelectRecord';

export const changeRoleAction = app.defineAction({
  name: 'Change role',
  description: 'Gives a user more or fewer rights in their store.',
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
    const role = await io.select.single(`New role for ${user.name}`, { options: constants.ROLES, defaultValue: user.role });

    if (role.value === user.role) {
      return `${user.name} stays ${role.label.toLowerCase()}.`;
    }

    await db.user.update({ where: { id }, data: { role: role.value } });

    return `${user.name} is ${role.label.toLowerCase()} now.`;
  },
});
