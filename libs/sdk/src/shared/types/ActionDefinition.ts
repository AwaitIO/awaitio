import { z } from 'zod/v4';
import { actionDefinitionSchema } from '../schemas/actionDefinitionSchema';

export type ActionDefinition = z.infer<typeof actionDefinitionSchema>;
