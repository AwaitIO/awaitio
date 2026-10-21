import { z } from 'zod/v4';
import { environmentLinkSchema } from '../schemas/environmentLinkSchema';

// One entry of the environment switcher in the header.
export type EnvironmentLink = z.infer<typeof environmentLinkSchema>;
