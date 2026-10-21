import { actionHref } from './actionHref';
import { Badge } from './Badge';
import { formatCellValue } from './formatCellValue';
import { Link } from './Link';
import { tableCellSchema } from '../shared/schemas/tableCellSchema';
import type { FC } from 'react';

export type TableCellViewProps = {
  value: unknown;
};

// One cell of a table in the browser: the value as people read it, a cell object as a colored label and/or a link,
// to a page outside AwaitIO (url) or to an action (route).
export const TableCellView: FC<TableCellViewProps> = ({ value }) => {
  const text = formatCellValue(value);
  const cell = tableCellSchema.safeParse(value);

  if (!cell.success) {
    return text;
  }

  const content = cell.data.highlightColor ? <Badge color={cell.data.highlightColor}>{text}</Badge> : text;

  if (cell.data.url) {
    return (
      <Link href={cell.data.url} external>
        {content}
      </Link>
    );
  }

  return cell.data.route ? <Link href={actionHref(cell.data.route)}>{content}</Link> : content;
};
