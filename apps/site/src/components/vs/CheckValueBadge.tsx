import { CheckBadgeIcon } from '../../icons/CheckBadgeIcon';
import { CrossBadgeIcon } from '../../icons/CrossBadgeIcon';
import { PartialBadgeIcon } from '../../icons/PartialBadgeIcon';
import type { ComparisonCheckValue } from '../../types/ComparisonCheckValue';
import type { FC } from 'react';

export type CheckValueBadgeProps = {
  value: ComparisonCheckValue;
};

const labels: Record<ComparisonCheckValue, string> = { yes: 'Yes', no: 'No', partial: 'In part' };

// The icon for one answer of the at-a-glance table, with its word for screen readers.
export const CheckValueBadge: FC<CheckValueBadgeProps> = ({ value }) => {
  return (
    <span className="inline-flex" title={labels[value]}>
      {value === 'yes' && <CheckBadgeIcon />}
      {value === 'no' && <CrossBadgeIcon />}
      {value === 'partial' && <PartialBadgeIcon />}
      <span className="sr-only">{labels[value]}</span>
    </span>
  );
};
