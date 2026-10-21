import { app } from '../../../app';
import { db } from '../../../db/db';

export const displayMarkdownAction = app.defineAction({
  name: 'Display markdown',
  description: 'io.display.markdown shows formatted text written in markdown.',
  handler: async ({ io }) => {
    const account = await db.account.findUniqueOrThrow({ where: { id: 'acc_01' } });
    const users = await db.user.count({ where: { accountId: account.id } });

    await io.display.markdown(`
## Before you delete

The account **${account.name}** has ${users} users.

- Their runs stay in the log
- Invoices are kept for 10 years
`);

    return 'Nothing was deleted.';
  },
});
