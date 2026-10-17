import type { ComponentUiProps } from './ComponentUiProps';
import type { ComponentType } from 'react';

// The browser half of a component definition, registered by its built script.
export type ComponentUi<TProps, TValue> = {
  component: ComponentType<ComponentUiProps<TProps, TValue>>;
  // The value the form starts with, before the user touches the control.
  initialValue?: (props: TProps) => TValue;
  // False when the component draws its own label and help text.
  wrap?: boolean;
};
