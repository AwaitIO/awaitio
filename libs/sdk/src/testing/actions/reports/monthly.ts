import { testApp } from '../../testApp';

export const monthly = testApp.defineAction({
  name: 'Monthly',
  handler: async () => {
    return 'Monthly report';
  },
});
