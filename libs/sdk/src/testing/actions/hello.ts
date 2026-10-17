import { testApp } from '../testApp';

export const hello = testApp.action({
  handler: async () => {
    return 'Hello';
  },
});
