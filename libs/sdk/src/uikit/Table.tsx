import type { RowMenuItem } from './RowMenu';
import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = {
  // Identifies the row for selection; stays the same when the filter or the pager hides other rows.
  id?: number;
  cells: Record<string, ReactNode>;
  // What the filter searches in this row, e.g. its cells as text.
  searchText: string;
  menu?: RowMenuItem[];
};

// A data table: an optional filter, a header row, one row per record with an optional "…" menu, and a pager.
// Filtering and paging happen in the browser, on the rows the page sent.
export type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  // Rows per page; the pager shows only when there are more.
  pageSize?: number;
  filterable?: boolean;
  // Shown when there are no rows.
  emptyText?: string;
  // A checkbox (or radio in single mode) in front of every row, e.g. for io.select.table. In multiple mode the "…" menu
  // above the table selects or clears all rows that match the filter.
  selection?: {
    mode: 'single' | 'multiple';
    selected: number[];
    onChange: (selected: number[]) => void;
    disabled?: boolean;
    // The most rows that may be selected; "Select all" is left out when the matching rows would go past it.
    maxSelections?: number;
  };
};

export const Table = themeBlock<TableProps>('Table');
