import { z } from 'zod';
import { pageContentSchema } from '../schemas/pageContentSchema';

export type PageContent = z.infer<typeof pageContentSchema>;
