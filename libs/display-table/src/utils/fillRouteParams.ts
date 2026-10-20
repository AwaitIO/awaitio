import type { ActionRoute } from 'awaitio/ui';

export type FillRouteParamsArgs = {
  route: ActionRoute;
  row: Record<string, unknown>;
};

// '{id}' in a param takes the row's id; anything else is used as it is.
export const fillRouteParams = ({ route, row }: FillRouteParamsArgs): ActionRoute => {
  const params = Object.entries(route.params ?? {}).map(([key, template]) => {
    return [
      key,
      template.replace(/\{(\w+)\}/g, (_match, name: string) => {
        return String(row[name] ?? '');
      }),
    ];
  });

  return { ...route, params: Object.fromEntries(params) };
};
