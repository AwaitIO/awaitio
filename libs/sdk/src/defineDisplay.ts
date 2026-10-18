import type { DisplayDefinition } from './types/DisplayDefinition';
import { callerDirectory } from './utils/callerDirectory';
import type { z } from 'zod';

export const defineDisplay = <TProps extends z.ZodTypeAny>(definition: Omit<DisplayDefinition<TProps>, 'kind' | 'uiDirectory'>): DisplayDefinition<TProps> => {
  return { kind: 'awaitio-display', ...definition, uiDirectory: callerDirectory({ depth: 1 }) };
};
