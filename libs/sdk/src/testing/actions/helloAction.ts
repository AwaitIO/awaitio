import { testApp } from '../testApp';

export const helloAction = testApp.defineAction({
  name: 'Hello',
  handler: async () => {
    return 'Hello';
  },
});
