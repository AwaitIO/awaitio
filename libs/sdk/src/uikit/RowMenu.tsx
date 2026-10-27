import { themeBlock } from './themeBlock';

// A link for the row, or an action the page runs itself, e.g. "Select all" in the table's own menu.
export type RowMenuItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      onClick: () => void;
    };

// The "…" button at the end of a table row with links for that row, or above the table with actions for all rows.
export type RowMenuProps = {
  items: RowMenuItem[];
  // The name of the button for screen readers; "Row actions" by default.
  label?: string;
};

export const RowMenu = themeBlock<RowMenuProps>('RowMenu');
