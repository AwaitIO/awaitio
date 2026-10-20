export type IsEmptyValueArgs = {
  value: unknown;
};

// What counts as no answer in an optional field: nothing, blank text or nothing picked.
export const isEmptyValue = ({ value }: IsEmptyValueArgs) => {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  return Array.isArray(value) && value.length === 0;
};
