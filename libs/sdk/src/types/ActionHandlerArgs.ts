import type { ActionCtx } from './ActionCtx';
import type { RunParams } from '../shared/types/RunParams';

// What an action's handler gets, as one object so it can take just what it needs: async ({ io }) or async ({ ctx }).
export type ActionHandlerArgs<TIO, TParams = Readonly<RunParams>> = {
  io: TIO;
  ctx: ActionCtx<TParams>;
};
