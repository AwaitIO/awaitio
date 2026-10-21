import type { AnySchema } from './types/AnySchema';
import type { LayoutDefinition } from './types/LayoutDefinition';
import { callerDirectory } from './utils/callerDirectory';

export const defineLayout = <TProps extends AnySchema>(definition: Omit<LayoutDefinition<TProps>, 'kind' | 'uiDirectory'>): LayoutDefinition<TProps> => {
  return { kind: 'awaitio-layout', ...definition, uiDirectory: callerDirectory({ depth: 1 }) };
};
