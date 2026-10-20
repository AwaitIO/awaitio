import type { ActionHandlerArgs } from './ActionHandlerArgs';
import type { ActionReturnValue } from './ActionReturnValue';
import type { RunParams } from '../shared/types/RunParams';

export type AwaitIOActionHandler<TIO, TParams = Readonly<RunParams>> = (args: ActionHandlerArgs<TIO, TParams>) => Promise<ActionReturnValue | void> | ActionReturnValue | void;
