import { useEffect, useState, type ComponentType, type FC } from 'react';

type JsonViewComponent = ComponentType<{ src: unknown; collapsed?: number }>;

export type ObjectViewProps = {
  data: unknown;
};

// react18-json-view is loaded in the browser only, when the data is first drawn; its styles come in ui.css.
export const ObjectView: FC<ObjectViewProps> = ({ data }) => {
  const [JsonView, setJsonView] = useState<JsonViewComponent | null>(null);

  useEffect(() => {
    void import('react18-json-view').then((module) => {
      setJsonView(() => {
        return module.default;
      });
    });
  }, []);

  // Nested data starts open two levels deep; deeper levels open on a click.
  return JsonView && <JsonView src={data} collapsed={2} />;
};
