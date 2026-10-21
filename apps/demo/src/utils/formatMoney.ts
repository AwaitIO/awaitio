export type FormatMoneyArgs = {
  amount: number;
};

export const formatMoney = ({ amount }: FormatMoneyArgs) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};
