import type { DisplayUiProps } from './DisplayUiProps';
import type { ComponentType } from 'react';

// The browser half of a display component definition, registered by its built script.
export type DisplayUi<TProps> = {
  component: ComponentType<DisplayUiProps<TProps>>;
};
