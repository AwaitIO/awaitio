export type MatchesWhereArgs<TRow> = {
  row: TRow;
  where: Partial<TRow> | undefined;
};

export const matchesWhere = <TRow>({ row, where }: MatchesWhereArgs<TRow>) => {
  return Object.entries(where ?? {}).every(([key, value]) => row[key as keyof TRow] === value);
};
