import type { IconProps } from './IconProps';
import type { FC } from 'react';

export type PricingTierInfo = {
  // Who the plan is for, drawn above its name: one person, a small team, a larger company, an enterprise.
  icon: FC<IconProps>;
  name: string;
  price: string;
  detail: string;
  features: string[];
  excluded: string[];
  cta: { label: string; href: string };
  highlighted: boolean;
};
