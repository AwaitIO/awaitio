import { app } from '../../../app';
import { db } from '../../../db/db';

export const selectTableAction = app.defineAction({
  name: 'Select table',
  description: 'io.select.table asks to pick rows of a table.',
  handler: async ({ io }) => {
    const accounts = await db.account.findMany();

    const [user] = await io.select.table('User', {
      data: await db.user.findMany({ orderBy: { name: 'asc' } }),
      columns: [{ label: 'Name', accessorKey: 'name' }, 'email', { label: 'Account', renderCell: (row) => accounts.find((account) => account.id === row.accountId)?.name ?? '–' }],
    });

    return { name: user?.name, email: user?.email };
  },
});
