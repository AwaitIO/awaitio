import type { FC, ReactNode } from 'react';

export type MetadataItem = {
  label: string;
  value: ReactNode;
  description?: string;
};

export type MetadataProps = {
  items: MetadataItem[];
};

// Label and value tiles in a grid, e.g. "Total accounts 542" above a table.
export const Metadata: FC<MetadataProps> = ({ items }) => {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        return (
          <div key={item.label} className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <dt className="text-sm text-gray-500">{item.label}</dt>
            <dd className="text-2xl font-semibold text-gray-900">{item.value}</dd>
            {item.description && <dd className="text-xs text-gray-500">{item.description}</dd>}
          </div>
        );
      })}
    </dl>
  );
};
