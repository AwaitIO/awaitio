import { app } from '../../../app';
import { db } from '../../../db/db';
import { changePlanAction } from '../../accounts/changePlanAction';

export const displayTableCellsAction = app.defineAction({
  name: 'Display table cells',
  description: 'io.display.table with colored labels, links and links to actions.',
  handler: async ({ io }) => {
    await io.display.table('Stores', {
      data: await db.account.findMany({ orderBy: { name: 'asc' } }),
      columns: [
        'name',
        { label: 'Status', renderCell: (account) => ({ label: account.status === 'suspended' ? 'Offline' : 'Online', highlightColor: account.status === 'suspended' ? 'red' : 'green' }) },
        { label: 'Website', renderCell: (account) => ({ label: 'Open', url: `https://${account.domain}` }) },
        { label: 'Plan', renderCell: (account) => ({ label: account.plan, route: changePlanAction.route({ params: { id: account.id } }) }) },
      ],
    });

    return 'Table shown.';
  },
});
