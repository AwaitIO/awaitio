import { testApp } from '../testApp';

export const echoParamsAction = testApp.defineAction({
  name: 'Echo params',
  handler: async ({ ctx }) => {
    return ctx.params;
  },
});
