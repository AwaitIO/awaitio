import { match, P } from 'ts-pattern';
import { formatCellValue } from '../../uikit/formatCellValue';
import { isPlainObject } from '../utils/isPlainObject';
import { isRowList } from '../utils/isRowList';
import type { FC } from 'react';

export type ActionResultProps = {
  data: unknown;
};

// The border sits on a wrapper: tables collapse their borders, which drops rounded corners.
const boxClassName = 'overflow-x-auto rounded-lg border border-gray-200 bg-white';
const tableClassName = 'w-full text-left text-sm';

// What the handler returned: text as text, an object as a table of keys and values, a list of records as a table with
// one row per record. Values read like in the display table: dates, numbers with separators, Yes/No.
export const ActionResult: FC<ActionResultProps> = ({ data }) => {
  return match(data)
    .with(P.nullish, () => {
      return <p className="text-sm text-gray-500">Done, nothing was returned.</p>;
    })
    .with(P.union(P.string, P.number, P.boolean), (primitive) => {
      return <p className={`${boxClassName} px-4 py-3 text-base whitespace-pre-wrap text-gray-900`}>{formatCellValue(primitive)}</p>;
    })
    .when(isRowList, (rows) => {
      const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];

      return (
        <div className={boxClassName}>
          <table className={tableClassName}>
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                {columns.map((column) => {
                  return (
                    <th key={column} className="px-4 py-2.5 font-medium whitespace-nowrap text-gray-900">
                      {column}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex} className="border-b border-gray-100 last:border-0">
                    {columns.map((column) => {
                      return (
                        <td key={column} className="px-4 py-2.5 text-gray-600">
                          {formatCellValue(row[column])}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    })
    .when(isPlainObject, (object) => {
      return (
        <div className={boxClassName}>
          <table className={tableClassName}>
            <tbody>
              {Object.entries(object).map(([key, value]) => {
                return (
                  <tr key={key} className="border-b border-gray-200 last:border-0">
                    <th scope="row" className="w-1/3 border-r border-gray-200 px-4 py-3 align-top font-medium text-gray-900">
                      {key}
                    </th>
                    <td className="px-4 py-3 align-top whitespace-pre-wrap text-gray-600">{formatCellValue(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    })
    .otherwise((value) => {
      return <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 text-xs">{JSON.stringify(value, null, 2)}</pre>;
    });
};
