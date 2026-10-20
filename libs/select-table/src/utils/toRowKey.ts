export type ToRowKeyArgs = {
  row: unknown;
};

// When a record of defaultValue is not one of `data` itself, it is matched by its values, so a copy from another query
// is found too. A BigInt (a Prisma id) is compared as text, which JSON alone cannot do.
export const toRowKey = ({ row }: ToRowKeyArgs) => {
  return JSON.stringify(row, (_key, value: unknown) => {
    return typeof value === 'bigint' ? value.toString() : value;
  });
};
