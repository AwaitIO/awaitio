import { testApp } from '../../testApp';

export const monthly = testApp.action({
  name: 'Monthly',
  handler: async () => {
    return 'Monthly report';
  },
});
