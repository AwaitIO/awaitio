import type { AnySchema } from './types/AnySchema';
import type { ComponentDefinition } from './types/ComponentDefinition';
import { callerDirectory } from './utils/callerDirectory';

export const defineComponent = <TProps extends AnySchema, TReturns extends AnySchema>(
  definition: Omit<ComponentDefinition<TProps, TReturns>, 'kind' | 'uiDirectory'>,
): ComponentDefinition<TProps, TReturns> => {
  return { kind: 'awaitio-component', ...definition, uiDirectory: callerDirectory({ depth: 1 }) };
};
