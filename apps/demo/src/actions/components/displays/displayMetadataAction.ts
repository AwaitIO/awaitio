import { app } from '../../../app';
import { db } from '../../../db/db';

export const displayMetadataAction = app.defineAction({
  name: 'Display metadata',
  description: 'io.display.metadata shows label and value tiles, such as totals.',
  handler: async ({ io }) => {
    const users = await db.user.findMany();
    const admins = users.filter((user) => user.role === 'admin');

    await io.display.metadata(null, {
      items: [
        { label: 'Users', value: users.length },
        { label: 'Admins', value: admins.length },
        { label: 'Activity this month', value: 45, description: 'Logins, runs and messages' },
      ],
    });

    return 'Totals shown.';
  },
});
