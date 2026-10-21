import { changePlanAction } from './changePlanAction';
import { createAccountAction } from './createAccountAction';
import { extendTrialAction } from './extendTrialAction';
import { suspendAccountAction } from './suspendAccountAction';
import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';
import { formatDate } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';

export const accountsPage = app.definePage({
  description: 'Every store on Shopwise, with its plan and status.',
  handler: async ({ io }) => {
    const accounts = await db.account.findMany({ orderBy: { createdAt: 'desc' } });
    const active = accounts.filter((account) => account.status === 'active');

    return io.layout.basic({
      title: 'Accounts',
      description: 'Every store on Shopwise, with its plan and status.',
      menuItems: [createAccountAction.route()],
      children: [
        io.display.metadata(null, {
          items: [
            { label: 'Accounts', value: accounts.length },
            { label: 'On trial', value: accounts.filter((account) => account.status === 'trial').length },
            { label: 'Monthly revenue', value: formatMoney({ amount: active.reduce((sum, account) => sum + account.monthlyRevenue, 0) }), description: 'From active accounts' },
          ],
        }),
        io.display.table('All accounts', {
          data: accounts,
          columns: [
            { label: 'Store', renderCell: (account) => ({ label: account.name, route: changePlanAction.route({ params: { id: account.id } }) }) },
            { label: 'Plan', renderCell: (account) => constants.PLANS.find((plan) => plan.value === account.plan)?.label ?? account.plan },
            {
              label: 'Status',
              renderCell: (account) => ({
                label: account.status === 'trial' ? `Trial until ${formatDate({ date: account.trialEndsAt })}` : account.status === 'active' ? 'Active' : 'Suspended',
                highlightColor: account.status === 'trial' ? 'yellow' : account.status === 'active' ? 'green' : 'red',
              }),
            },
            { label: 'Revenue', renderCell: (account) => formatMoney({ amount: account.monthlyRevenue }) },
            { label: 'Owner', accessorKey: 'ownerEmail' },
            { label: 'Since', renderCell: (account) => formatDate({ date: account.createdAt }) },
          ],
          rowMenuItems: (account) => [
            changePlanAction.route({ params: { id: account.id } }),
            ...(account.status === 'trial' ? [extendTrialAction.route({ params: { id: account.id } })] : []),
            ...(account.status !== 'suspended' ? [suspendAccountAction.route({ params: { id: account.id } })] : []),
          ],
        }),
      ],
    });
  },
});
