import { app } from '../../../app';

export const inputUrlAction = app.defineAction({
  name: 'Input URL',
  description: 'io.input.url asks for a web address and returns a URL.',
  handler: async ({ io }) => {
    const website = await io.input.url('Website', {
      placeholder: 'https://example.com',
    });

    return { website: website.href, hostname: website.hostname };
  },
});
