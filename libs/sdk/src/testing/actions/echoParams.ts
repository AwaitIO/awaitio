import { testApp } from '../testApp';

export const echoParams = testApp.defineAction({
  name: 'Echo params',
  handler: async ({ ctx }) => {
    return ctx.params;
  },
});
