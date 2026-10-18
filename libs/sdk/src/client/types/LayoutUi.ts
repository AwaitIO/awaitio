import type { LayoutUiProps } from './LayoutUiProps';
import type { ComponentType } from 'react';

// The browser half of a layout definition, registered by its built script.
export type LayoutUi<TProps> = {
  component: ComponentType<LayoutUiProps<TProps>>;
};
