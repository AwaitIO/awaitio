import type { ComponentTree } from './ComponentTree';
import type { DisplayTree } from './DisplayTree';
import type { Layouts } from './Layouts';
import type { LayoutTree } from './LayoutTree';

// The io a page handler gets: display components to show and layouts to place them in.
export type PageIO<T extends ComponentTree, L extends LayoutTree> = DisplayTree<T> & {
  layout: Layouts<L>;
};
