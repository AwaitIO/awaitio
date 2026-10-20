import type { PageCtx } from './PageCtx';

// What a page's handler gets, as one object like an action's: async ({ io, ctx }).
export type PageHandlerArgs<TIO> = {
  io: TIO;
  ctx: PageCtx;
};
