export type ToSlugSegmentArgs = {
  name: string;
};

// A file or folder name as part of an action slug: refundOrder.ts and refund-order.ts both become refund_order.
export const toSlugSegment = ({ name }: ToSlugSegmentArgs) => {
  return name
    .replace(/\.(ts|tsx|js|mjs|cjs)$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};
