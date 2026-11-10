export type ToRouteParamsArgs = {
  // What route() got as params, before the schema parses it: numbers, dates, strings, or nothing.
  params: Record<string, unknown> | undefined;
};

// The params of a route as the query string carries them: strings, dates as ISO, empty values left out.
export const toRouteParams = ({ params }: ToRouteParamsArgs) => {
  return Object.fromEntries(
    Object.entries(params ?? {})
      .filter(([, value]) => {
        return value !== undefined && value !== null;
      })
      .map(([key, value]) => {
        return [key, value instanceof Date ? value.toISOString() : String(value)];
      }),
  );
};
