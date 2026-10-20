import { testApp } from '../testApp';

export const fullName = testApp.action({
  name: 'Full name',
  description: 'Two fields',
  handler: async (io) => {
    const { firstName, lastName } = await io.group({ firstName: io.input.text('First name'), lastName: io.input.text('Last name') });

    return `${firstName} ${lastName}`;
  },
});
