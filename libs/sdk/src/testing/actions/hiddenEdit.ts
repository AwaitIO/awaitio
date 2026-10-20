import { testApp } from '../testApp';

export const hiddenEdit = testApp.defineAction({
  name: 'Hidden edit',
  unlisted: true,
  handler: async () => {
    return 'Edited';
  },
});
