export type ToOrderArgs = {
  order: unknown;
  // Names the action or page in the error, e.g. The action "billing/send_reminder".
  owner: string;
};

// The order of an action or a page as the action list sends it: null when it has none. The type asks for a number; this
// catches plain JavaScript, a string from an env variable and NaN.
export const toOrder = ({ order, owner }: ToOrderArgs) => {
  if (order === undefined || order === null) {
    return null;
  }

  if (typeof order !== 'number' || !Number.isFinite(order)) {
    throw new Error(`${owner} has order ${typeof order === 'string' ? `"${order}"` : String(order)}; use a number, e.g. order: 1.`);
  }

  return order;
};
