import { app } from '../../app';

export const confirmAction = app.defineAction({
  name: 'Confirm',
  description: 'io.confirm asks before something irreversible.',
  handler: async ({ io }) => {
    const isConfirmed = await io.confirm('Delete this user account?', {
      helpText: 'All of their data will be deleted immediately.',
    });

    if (!isConfirmed) {
      return 'Nothing was deleted.';
    }

    // The demo saves nothing, so the account stays.
    return 'The account would be deleted now.';
  },
});
