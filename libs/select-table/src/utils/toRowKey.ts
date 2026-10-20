export type ToRowKeyArgs = {
  row: unknown;
};

// Rows travel to the browser and back as JSON, so a row is recognised by its JSON (a Date becomes its ISO string).
export const toRowKey = ({ row }: ToRowKeyArgs) => {
  return JSON.stringify(row);
};
