import type { PageCtx } from './PageCtx';
import type { RunParams } from '../shared/types/RunParams';

// What a page's handler gets, as one object like an action's: async ({ io, ctx }).
export type PageHandlerArgs<TIO, TParams = Readonly<RunParams>> = {
  io: TIO;
  ctx: PageCtx<TParams>;
};
