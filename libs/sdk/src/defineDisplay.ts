import type { AnySchema } from './types/AnySchema';
import type { DisplayDefinition } from './types/DisplayDefinition';
import { callerDirectory } from './utils/callerDirectory';

export const defineDisplay = <TProps extends AnySchema>(definition: Omit<DisplayDefinition<TProps>, 'kind' | 'uiDirectory'>): DisplayDefinition<TProps> => {
  return { kind: 'awaitio-display', ...definition, uiDirectory: callerDirectory({ depth: 1 }) };
};
