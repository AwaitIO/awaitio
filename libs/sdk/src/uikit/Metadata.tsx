import { themeBlock } from './themeBlock';
import type { ReactNode } from 'react';

export type MetadataItem = {
  label: string;
  value: ReactNode;
  description?: string;
};

// Label and value tiles in a grid, e.g. "Total accounts 542" above a table.
export type MetadataProps = {
  items: MetadataItem[];
};

export const Metadata = themeBlock<MetadataProps>('Metadata');
