import { RowMenu, type TableProps } from 'awaitio/ui';
import { useState, type FC } from 'react';

// A data table for layouts: an optional filter, a header row, one row per record with an optional "…" menu, and a pager.
// Filtering and paging happen in the browser, on the rows the page sent.
export const Table: FC<TableProps> = ({ columns, rows, pageSize = 20, filterable = true, emptyText = 'Nothing to show.', selection }) => {
  const [filter, setFilter] = useState('');
  // A locked selection (disabled io.select.table) greys the table out; paging stays, to see what is there.
  const isDisabled = selection?.disabled === true;
  const [page, setPage] = useState(0);
  const query = filter.trim().toLowerCase();
  const matching = query
    ? rows.filter((row) => {
        return row.searchText.toLowerCase().includes(query);
      })
    : rows;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const shown = matching.slice(current * pageSize, (current + 1) * pageSize);
  const hasMenu = rows.some((row) => {
    return (row.menu ?? []).length > 0;
  });
  const hasToolbar = filterable || matching.length > pageSize;
  const pagerButton = 'rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className={['rounded-lg border border-gray-200', isDisabled ? 'bg-gray-100 text-gray-500' : 'bg-white'].join(' ')}>
      {hasToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-3 py-2">
          {filterable ? (
            <input
              type="search"
              value={filter}
              placeholder="Filter"
              aria-label="Filter rows"
              disabled={isDisabled}
              onChange={(event) => {
                setFilter(event.target.value);
                setPage(0);
              }}
              className="w-full max-w-56 rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:border-gray-900 focus:outline-none enabled:bg-white disabled:bg-gray-100"
            />
          ) : (
            <span />
          )}
          {matching.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>
                {current * pageSize + 1}–{Math.min((current + 1) * pageSize, matching.length)} of {matching.length}
              </span>
              {matching.length > pageSize && (
                <>
                  <button
                    type="button"
                    disabled={current === 0}
                    onClick={() => {
                      setPage(current - 1);
                    }}
                    className={pagerButton}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={current >= pageCount - 1}
                    onClick={() => {
                      setPage(current + 1);
                    }}
                    className={pagerButton}
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {shown.length === 0 ? (
        <p className="px-4 py-6 text-sm text-gray-500">{query ? 'No rows match the filter.' : emptyText}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Without the toolbar the header row is the top of the box, so its corners follow the border. */}
            <thead className={hasToolbar ? 'bg-gray-50' : 'bg-gray-50 [&_th:first-child]:rounded-tl-lg [&_th:last-child]:rounded-tr-lg'}>
              <tr className="border-b border-gray-200">
                {selection && <th className="w-10" aria-label="Selected" />}
                {columns.map((column) => {
                  return (
                    <th key={column.key} className="px-4 py-2.5 font-medium whitespace-nowrap text-gray-500">
                      {column.label}
                    </th>
                  );
                })}
                {hasMenu && <th className="w-10" aria-label="Row actions" />}
              </tr>
            </thead>
            <tbody>
              {shown.map((row, rowIndex) => {
                return (
                  <tr key={row.id ?? current * pageSize + rowIndex} className="border-b border-gray-100 last:border-0">
                    {selection && row.id !== undefined && (
                      <td className="py-2.5 pl-4">
                        <input
                          type={selection.mode === 'single' ? 'radio' : 'checkbox'}
                          aria-label="Select row"
                          checked={selection.selected.includes(row.id)}
                          disabled={selection.disabled}
                          onChange={() => {
                            const id = row.id ?? -1;
                            const isSelected = selection.selected.includes(id);

                            selection.onChange(
                              selection.mode === 'single'
                                ? [id]
                                : isSelected
                                ? selection.selected.filter((selected) => {
                                    return selected !== id;
                                  })
                                : [...selection.selected, id],
                            );
                          }}
                          className="accent-gray-900"
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      return (
                        <td key={column.key} className="px-4 py-2.5">
                          {row.cells[column.key]}
                        </td>
                      );
                    })}
                    {hasMenu && <td className="px-2 py-1.5">{row.menu && row.menu.length > 0 && <RowMenu items={row.menu} />}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
