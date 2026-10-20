import type { TableCell } from './TableCell';

// What a table cell can hold: a plain value, formatted for reading, or a cell object (a colored label, a link).
export type TableCellValue = string | number | boolean | Date | null | undefined | TableCell;
