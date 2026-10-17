import type { ActionCtx } from './ActionCtx';
import type { ActionReturnValue } from './ActionReturnValue';

export type AwaitIOActionHandler<TIO> = (io: TIO, ctx: ActionCtx) => Promise<ActionReturnValue | void> | ActionReturnValue | void;
