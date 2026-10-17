import { z } from 'zod';
import { appEnvironmentSchema } from './appEnvironmentSchema';

export const environmentLinkSchema = appEnvironmentSchema.extend({
  url: z.string(),
  isCurrent: z.boolean(),
});
