import { changeRoleAction } from './changeRoleAction';
import { inviteUserAction } from './inviteUserAction';
import { resetPasswordAction } from './resetPasswordAction';
import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';
import { formatDate } from '../../utils/formatDate';

export const usersPage = app.definePage({
  description: 'Everyone who can log in to a Shopwise store.',
  handler: async ({ io }) => {
    const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });
    const accounts = await db.account.findMany();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return io.layout.basic({
      title: 'Users',
      description: 'Everyone who can log in to a Shopwise store.',
      menuItems: [inviteUserAction.route(), resetPasswordAction.route()],
      children: [
        io.display.metadata(null, {
          items: [
            { label: 'Users', value: users.length },
            { label: 'Owners and admins', value: users.filter((user) => user.role !== 'member').length },
            { label: 'Active this week', value: users.filter((user) => user.lastLoginAt && user.lastLoginAt.getTime() > weekAgo).length, description: 'In the last 7 days' },
          ],
        }),
        io.display.table('All users', {
          data: users,
          columns: [
            { label: 'Name', renderCell: (user) => ({ label: user.name, route: changeRoleAction.route({ params: { id: user.id } }) }) },
            { label: 'Email', accessorKey: 'email' },
            { label: 'Store', renderCell: (user) => accounts.find((account) => account.id === user.accountId)?.name ?? '–' },
            {
              label: 'Role',
              renderCell: (user) => ({
                label: constants.ROLES.find((role) => role.value === user.role)?.label ?? user.role,
                highlightColor: user.role === 'owner' ? 'purple' : user.role === 'admin' ? 'blue' : 'gray',
              }),
            },
            { label: 'Last login', renderCell: (user) => formatDate({ date: user.lastLoginAt }) },
          ],
          rowMenuItems: (user) => [changeRoleAction.route({ params: { id: user.id } }), resetPasswordAction.route({ params: { id: user.id } })],
        }),
      ],
    });
  },
});
