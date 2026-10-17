import type { ComponentUi } from '../../client/types/ComponentUi';

export type ComponentUisState = { status: 'loading' } | { status: 'ready'; uis: Map<string, ComponentUi<unknown, unknown>> } | { status: 'error'; message: string };
