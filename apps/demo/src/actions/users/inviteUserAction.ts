import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';

export const inviteUserAction = app.defineAction({
  name: 'Invite user',
  description: 'Sends an invitation to join a store.',
  handler: async ({ io }) => {
    const accounts = await db.account.findMany({ orderBy: { name: 'asc' } });

    const { account, name, email, role } = await io.group({
      account: io.select.single('Store', { options: accounts.map((account) => ({ label: account.name, value: account.id })) }),
      name: io.input.text('Name'),
      email: io.input.email('Email'),
      role: io.select.single('Role', { options: constants.ROLES.filter((option) => option.value !== 'owner'), defaultValue: 'member' }),
    });

    const user = await db.user.create({
      data: { name, email, role: role.value, accountId: account.value, lastLoginAt: null, createdAt: new Date() },
    });

    return `Invited ${user.name} (${user.email}) to ${account.label} as ${role.label.toLowerCase()}.`;
  },
});
