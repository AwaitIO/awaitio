import { testApp } from '../../testApp';

export const monthlyAction = testApp.defineAction({
  name: 'Monthly',
  handler: async () => {
    return 'Monthly report';
  },
});
