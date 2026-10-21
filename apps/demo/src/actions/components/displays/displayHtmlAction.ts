import { app } from '../../../app';
import { db } from '../../../db/db';
import { formatDate } from '../../../utils/formatDate';

export const displayHtmlAction = app.defineAction({
  name: 'Display HTML',
  description: 'io.display.html shows HTML markup, sanitized first.',
  handler: async ({ io }) => {
    const [account] = await db.account.findMany({ where: { status: 'trial' }, take: 1 });

    if (!account) {
      return 'No store is on trial.';
    }

    await io.display.html('Email preview', {
      html: `<p>Hi,</p><p>the trial of <strong>${account.name}</strong> ends on <strong>${formatDate({
        date: account.trialEndsAt,
      })}</strong>. Pick a plan to keep the store online.</p><p><a href="https://${account.domain}/admin/billing">Choose a plan</a></p>`,
    });

    return `Previewed the trial ending email of ${account.name}.`;
  },
});
