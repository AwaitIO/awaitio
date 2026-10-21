import type { FC } from 'react';

export type SketchLabelProps = {
  text: string;
};

export const SketchLabel: FC<SketchLabelProps> = ({ text }) => {
  return <span className="text-[11px] font-medium text-gray-700">{text}</span>;
};
