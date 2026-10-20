import type { DisplayElement } from './DisplayElement';
import type { LayoutElement } from './LayoutElement';

// A layout with display components in it, or just the display components, shown in the layout registered as basic.
export type PageHandlerResult = LayoutElement | DisplayElement[];
