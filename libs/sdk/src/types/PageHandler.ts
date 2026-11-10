import type { PageHandlerArgs } from './PageHandlerArgs';
import type { PageHandlerResult } from './PageHandlerResult';
import type { RunParams } from '../shared/types/RunParams';

export type PageHandler<TIO, TParams = Readonly<RunParams>> = (args: PageHandlerArgs<TIO, TParams>) => PageHandlerResult | Promise<PageHandlerResult>;
