import type { ActionCtx } from './ActionCtx';
import type { ActionReturnValue } from './ActionReturnValue';
import type { RunParams } from '../shared/types/RunParams';

export type AwaitIOActionHandler<TIO, TParams = Readonly<RunParams>> = (io: TIO, ctx: ActionCtx<TParams>) => Promise<ActionReturnValue | void> | ActionReturnValue | void;
