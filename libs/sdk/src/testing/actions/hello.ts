import { testApp } from '../testApp';

export const hello = testApp.defineAction({
  name: 'Hello',
  handler: async () => {
    return 'Hello';
  },
});
