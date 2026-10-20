import type { PageHandlerArgs } from './PageHandlerArgs';
import type { PageHandlerResult } from './PageHandlerResult';

export type PageHandler<TIO> = (args: PageHandlerArgs<TIO>) => PageHandlerResult | Promise<PageHandlerResult>;
