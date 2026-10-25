import type { IconProps } from './IconProps';
import type { FC } from 'react';

export type UseCase = {
  title: string;
  description: string;
  icon: FC<IconProps>;
};
