import { z } from 'zod';
import { appEnvironmentSchema } from './appEnvironmentSchema';
import { environmentLinkSchema } from './environmentLinkSchema';

export const appInfoSchema = z.object({
  name: z.string(),
  environment: appEnvironmentSchema.nullable(),
  // Empty without a session: the URLs of other environments are not shown to anyone who is not logged in.
  environments: z.array(environmentLinkSchema),
  // Block name → position of the theme script that draws it.
  themeBlocks: z.record(z.number().int().nonnegative()),
});
