import { app } from '../../../app';

export const inputEmailAction = app.defineAction({
  name: 'Input email',
  description: 'io.input.email asks for an email address.',
  handler: async ({ io }) => {
    const ownerEmail = await io.input.email('Owner email', {
      placeholder: 'ada@example.com',
      helpText: 'Gets the invitation',
    });

    return { ownerEmail };
  },
});
