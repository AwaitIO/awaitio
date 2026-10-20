import type { ComponentDefinition } from './ComponentDefinition';
import type { z } from 'zod';

// The component's own props, plus `disabled`, which every input takes: the field shows its starting value and cannot be
// changed, and the handler gets that value whatever the browser sends.
export type IOMethodProps<TDefinition extends ComponentDefinition> = z.input<TDefinition['props']> & { disabled?: boolean };
