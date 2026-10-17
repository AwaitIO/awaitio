import { match, P } from 'ts-pattern';
import { formatValue } from '../utils/formatValue';
import { isPlainObject } from '../utils/isPlainObject';
import { isRowList } from '../utils/isRowList';
import type { FC } from 'react';

export type ActionResultProps = {
  data: unknown;
};

// A primitive is shown as text, an object as key/value pairs and a list of
// objects as a table.
export const ActionResult: FC<ActionResultProps> = ({ data }) => {
  return match(data)
    .with(P.nullish, () => {
      return <p className="text-sm text-gray-500">Done, nothing was returned.</p>;
    })
    .with(P.union(P.string, P.number, P.boolean), (primitive) => {
      return <p className="whitespace-pre-wrap text-lg">{String(primitive)}</p>;
    })
    .when(isRowList, (rows) => {
      const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];

      return (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column) => {
                  return (
                    <th key={column} className="px-3 py-2 font-medium text-gray-500">
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
                        <td key={column} className="px-3 py-2">
                          {formatValue(row[column])}
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
        <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
          {Object.entries(object).map(([key, value]) => {
            return [
              <dt key={`${key}-key`} className="font-medium text-gray-500">
                {key}
              </dt>,
              <dd key={`${key}-value`} className="whitespace-pre-wrap">
                {formatValue(value)}
              </dd>,
            ];
          })}
        </dl>
      );
    })
    .otherwise((value) => {
      return <pre className="overflow-x-auto rounded-md bg-gray-100 p-3 text-xs">{JSON.stringify(value, null, 2)}</pre>;
    });
};
