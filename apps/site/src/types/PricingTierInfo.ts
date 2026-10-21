export type PricingTierInfo = {
  name: string;
  price: string;
  detail: string;
  note: string;
  cta: { label: string; href: string };
  highlighted: boolean;
};
