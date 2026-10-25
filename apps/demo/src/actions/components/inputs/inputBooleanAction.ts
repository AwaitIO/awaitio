import { app } from '../../../app';

export const inputBooleanAction = app.defineAction({
  name: 'Input boolean',
  description: 'io.input.boolean asks a yes or no question with a checkbox.',
  handler: async ({ io }) => {
    const sendEmail = await io.input.boolean('Send a confirmation email', {
      defaultValue: true,
      helpText: 'The customer gets a copy',
    });

    return { sendEmail };
  },
});
