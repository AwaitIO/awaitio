import { testApp } from '../testApp';

export const whoAmI = testApp.defineAction({
  name: 'Who am I',
  handler: async (_io, ctx) => {
    return `${ctx.user.name} <${ctx.user.email}>`;
  },
});
