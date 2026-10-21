import type { ComponentDefinition } from './ComponentDefinition';
import type { IOMethodProps } from './IOMethodProps';
import type { IOPromise } from '../classes/IOPromise';
import type { z } from 'zod/v4';

// Props are optional when the component has no required prop.
export type IOMethod<TDefinition extends ComponentDefinition> = (
  label: string,
  ...props: Record<string, never> extends IOMethodProps<TDefinition> ? [props?: IOMethodProps<TDefinition>] : [props: IOMethodProps<TDefinition>]
) => IOPromise<z.output<TDefinition['returns']>>;
