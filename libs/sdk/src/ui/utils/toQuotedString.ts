export type ToQuotedStringArgs = {
  value: string;
};

// A single-quoted TypeScript string literal, so a name like O'Brien still pastes into app.ts as valid code.
export const toQuotedString = ({ value }: ToQuotedStringArgs) => {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
};
