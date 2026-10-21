export type PricingTierInfo = {
  name: string;
  price: string;
  detail: string;
  features: string[];
  excluded: string[];
  cta: { label: string; href: string };
  highlighted: boolean;
};
