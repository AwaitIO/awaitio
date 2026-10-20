import { testApp } from '../testApp';

export const echoParams = testApp.action({
  name: 'Echo params',
  handler: async (_io, ctx) => {
    return ctx.params;
  },
});
