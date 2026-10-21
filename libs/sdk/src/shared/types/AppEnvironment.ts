import { z } from 'zod/v4';
import { appEnvironmentSchema } from '../schemas/appEnvironmentSchema';

// The environment the browser is on, shown as a badge next to the project name.
export type AppEnvironment = z.infer<typeof appEnvironmentSchema>;
