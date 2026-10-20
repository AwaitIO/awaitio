import { testApp } from '../testApp';

export const hiddenEditAction = testApp.defineAction({
  name: 'Hidden edit',
  unlisted: true,
  handler: async () => {
    return 'Edited';
  },
});
