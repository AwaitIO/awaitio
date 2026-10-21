import { app } from '../../app';
import { constants } from '../../constants';
import { db } from '../../db/db';

export const createAccountAction = app.defineAction({
  name: 'Create account',
  description: 'Opens a 14-day trial for a new store and invites its owner.',
  handler: async ({ io }) => {
    const { name, domain, ownerName, ownerEmail, plan } = await io.group({
      store: io.display.heading('Store', { description: 'How the store is called and where it runs.' }),
      name: io.input.text('Store name', { placeholder: 'Acme Coffee' }),
      domain: io.input.text('Domain', { placeholder: 'acme-coffee.example' }),
      owner: io.display.heading('Owner', { description: 'Gets the invitation and full access.' }),
      ownerName: io.input.text('Owner name'),
      ownerEmail: io.input.email('Owner email'),
      plan: io.select.single('Plan after the trial', { options: constants.PLANS, defaultValue: 'growth' }),
    });

    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    const account = await db.account.create({
      data: { name, domain, plan: plan.value, status: 'trial', monthlyRevenue: 0, ownerEmail, trialEndsAt, createdAt: new Date() },
    });

    await db.user.create({
      data: { name: ownerName, email: ownerEmail, role: 'owner', accountId: account.id, lastLoginAt: null, createdAt: new Date() },
    });

    return { account: account.name, id: account.id, plan: plan.label, trialEndsAt, invitationSentTo: ownerEmail };
  },
});
