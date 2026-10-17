import type { ComponentDefinition } from './ComponentDefinition';
import type { z } from 'zod';

export type IOMethodProps<TDefinition extends ComponentDefinition> = z.input<TDefinition['props']>;
