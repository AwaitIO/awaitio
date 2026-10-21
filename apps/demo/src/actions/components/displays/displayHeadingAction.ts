import { app } from '../../../app';
import { constants } from '../../../constants';

export const displayHeadingAction = app.defineAction({
  name: 'Display heading',
  description: 'io.display.heading puts a section title into a form.',
  handler: async ({ io }) => {
    const { name, plan } = await io.group({
      company: io.display.heading('Company', { description: 'How the account is called and billed.' }),
      name: io.input.text('Name'),
      plan: io.select.single('Plan', { options: constants.PLANS }),
    });

    return { name, plan: plan.label };
  },
});
