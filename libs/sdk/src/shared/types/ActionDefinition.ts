import { z } from 'zod';
import { actionDefinitionSchema } from '../schemas/actionDefinitionSchema';

export type ActionDefinition = z.infer<typeof actionDefinitionSchema>;
