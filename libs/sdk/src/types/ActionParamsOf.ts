import type { ActionParamsSchema } from './ActionParamsSchema';
import type { RunParams } from '../shared/types/RunParams';
import type { z } from 'zod/v4';

// ctx.params of an action: what its params schema returns, or the plain strings without one.
export type ActionParamsOf<TSchema extends ActionParamsSchema | undefined> = TSchema extends ActionParamsSchema ? z.output<TSchema> : Readonly<RunParams>;
