import { testApp } from '../testApp';

export const hiddenEdit = testApp.action({
  name: 'Hidden edit',
  unlisted: true,
  handler: async () => {
    return 'Edited';
  },
});
