import type { DisplayElement } from './DisplayElement';
import type { LayoutElement } from './LayoutElement';

// A layout with display components in it, or just the display components, shown in the basic layout.
export type PageHandlerResult = LayoutElement | DisplayElement[];
