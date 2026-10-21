import { app } from '../../../app';

export const inputTextareaAction = app.defineAction({
  name: 'Input textarea',
  description: 'io.input.textarea asks for longer text over several lines.',
  handler: async ({ io }) => {
    const reason = await io.input.textarea('Why refund this payment?', {
      lines: 4,
      minLength: 10,
      helpText: 'Goes to the customer with the refund',
    });

    return { reason };
  },
});
