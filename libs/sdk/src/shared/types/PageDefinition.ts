import { z } from 'zod/v4';
import { pageDefinitionSchema } from '../schemas/pageDefinitionSchema';

export type PageDefinition = z.infer<typeof pageDefinitionSchema>;
