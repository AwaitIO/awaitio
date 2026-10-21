import { z } from 'zod/v4';
import { appInfoSchema } from '../schemas/appInfoSchema';

// What the project calls itself, shown on the login page and in the header.
export type AppInfo = z.infer<typeof appInfoSchema>;
