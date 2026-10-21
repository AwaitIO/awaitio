export type SortRowsArgs<TRow> = {
  rows: TRow[];
  orderBy: Partial<Record<keyof TRow, 'asc' | 'desc'>> | undefined;
};

export const sortRows = <TRow>({ rows, orderBy }: SortRowsArgs<TRow>) => {
  const [entry] = Object.entries(orderBy ?? {}) as [keyof TRow, 'asc' | 'desc'][];

  if (!entry) {
    return rows;
  }

  const [key, direction] = entry;

  return [...rows].sort((a, b) => {
    const order = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;

    return direction === 'asc' ? order : -order;
  });
};
