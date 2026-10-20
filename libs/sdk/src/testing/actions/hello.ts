import { testApp } from '../testApp';

export const hello = testApp.action({
  name: 'Hello',
  handler: async () => {
    return 'Hello';
  },
});
