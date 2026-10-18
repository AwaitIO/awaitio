import { testApp } from '../../testApp';

export const monthly = testApp.action({
  handler: async () => {
    return 'Monthly report';
  },
});
