import { z } from 'zod/v4';
import { pageContentSchema } from '../schemas/pageContentSchema';

export type PageContent = z.infer<typeof pageContentSchema>;
