import { app } from '../../../app';

export const inputTextAction = app.defineAction({
  name: 'Input text',
  description: 'io.input.text asks for one line of text.',
  handler: async ({ io }) => {
    const query = await io.input.text('Search for', {
      placeholder: 'refund',
      helpText: 'A user or what they did',
    });

    return { query };
  },
});
