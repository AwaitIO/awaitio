import { app } from '../../../app';
import { db } from '../../../db/db';
import { changeRoleAction } from '../../users/changeRoleAction';

export const displayTableAction = app.defineAction({
  name: 'Display table',
  description: 'io.display.table shows records with links and a row menu.',
  handler: async ({ io }) => {
    const accounts = await db.account.findMany();

    await io.display.table('All users', {
      data: await db.user.findMany({ where: { accountId: 'acc_01' } }),
      columns: [
        { label: 'Name', renderCell: (row) => ({ label: row.name, route: changeRoleAction.route({ params: { id: row.id } }) }) },
        { label: 'Email', accessorKey: 'email' },
        { label: 'Account', renderCell: (row) => accounts.find((account) => account.id === row.accountId)?.name ?? '–' },
        'createdAt',
      ],
      rowMenuItems: (row) => [changeRoleAction.route({ params: { id: row.id } })],
    });

    return 'Table shown.';
  },
});
