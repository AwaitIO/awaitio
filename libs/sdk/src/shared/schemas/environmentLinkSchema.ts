import { z } from 'zod/v4';
import { appEnvironmentSchema } from './appEnvironmentSchema';

export const environmentLinkSchema = appEnvironmentSchema.extend({
  url: z.string(),
  isCurrent: z.boolean(),
});
