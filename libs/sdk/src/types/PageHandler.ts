import type { PageCtx } from './PageCtx';
import type { PageHandlerResult } from './PageHandlerResult';

export type PageHandler<TIO> = (io: TIO, ctx: PageCtx) => PageHandlerResult | Promise<PageHandlerResult>;
