import type { ComponentDefinition } from './types/ComponentDefinition';
import { callerDirectory } from './utils/callerDirectory';
import type { z } from 'zod';

export const defineComponent = <TProps extends z.ZodTypeAny, TReturns extends z.ZodTypeAny>(
  definition: Omit<ComponentDefinition<TProps, TReturns>, 'kind' | 'uiDirectory'>,
): ComponentDefinition<TProps, TReturns> => {
  return { kind: 'awaitit-component', ...definition, uiDirectory: callerDirectory({ depth: 1 }) };
};
