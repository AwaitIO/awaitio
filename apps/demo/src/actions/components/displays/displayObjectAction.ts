import { app } from '../../../app';
import { db } from '../../../db/db';

export const displayObjectAction = app.defineAction({
  name: 'Display object',
  description: 'io.display.object shows the keys and values of a record.',
  handler: async ({ io }) => {
    const account = await db.account.findUniqueOrThrow({ where: { id: 'acc_01' } });

    await io.display.object('Account', { data: account });

    return 'Record shown.';
  },
});
