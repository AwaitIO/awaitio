import { themeBlock } from './themeBlock';

export type RowMenuItem = {
  label: string;
  href: string;
};

// The "…" button at the end of a table row with links for that row.
export type RowMenuProps = {
  items: RowMenuItem[];
};

export const RowMenu = themeBlock<RowMenuProps>('RowMenu');
