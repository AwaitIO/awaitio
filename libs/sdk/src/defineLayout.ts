import type { LayoutDefinition } from './types/LayoutDefinition';
import { callerDirectory } from './utils/callerDirectory';
import type { z } from 'zod';

export const defineLayout = <TProps extends z.ZodTypeAny>(definition: Omit<LayoutDefinition<TProps>, 'kind' | 'uiDirectory'>): LayoutDefinition<TProps> => {
  return { kind: 'awaitio-layout', ...definition, uiDirectory: callerDirectory({ depth: 1 }) };
};
