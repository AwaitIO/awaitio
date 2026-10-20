import { testApp } from '../testApp';

export const echoParams = testApp.defineAction({
  name: 'Echo params',
  handler: async (_io, ctx) => {
    return ctx.params;
  },
});
