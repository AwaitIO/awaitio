import { z } from 'zod';
import { environmentLinkSchema } from '../schemas/environmentLinkSchema';

// One entry of the environment switcher in the header.
export type EnvironmentLink = z.infer<typeof environmentLinkSchema>;
