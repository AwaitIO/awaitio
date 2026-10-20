import { useFieldId, type MultiSelectProps } from 'awaitio/ui';
import { SelectArrow } from '../components/SelectArrow';
import { constants } from '../constants';
import type { FC } from 'react';

// One frame: the drop-down as a normal control on top, the chosen options under it, a row each with a × on the right.
export const MultiSelect: FC<MultiSelectProps> = ({ choices, value, onChange, placeholder = 'Add…', isFull = false, disabled, autoFocus }) => {
  const remaining = choices.filter((choice) => {
    return !value.includes(choice.value);
  });
  const chosen = choices.filter((choice) => {
    return value.includes(choice.value);
  });

  return (
    <div className="divide-y divide-gray-200 rounded-md border border-gray-300 bg-gray-50 text-sm">
      <div className="p-2">
        <div className="relative">
          <select
            id={useFieldId()}
            value=""
            disabled={disabled || isFull || remaining.length === 0}
            autoFocus={autoFocus}
            onChange={(event) => {
              onChange([...value, event.target.value]);
            }}
            className={constants.SELECT_CLASS_NAME}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {remaining.map((choice) => {
              return (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              );
            })}
          </select>
          <SelectArrow />
        </div>
      </div>
      {chosen.map((choice) => {
        return (
          <div key={choice.value} className="flex items-center justify-between gap-3 bg-white py-1.5 pr-3.5 pl-5 text-gray-900 last:rounded-b-md">
            {choice.label}
            <button
              type="button"
              aria-label={`Remove ${choice.label}`}
              disabled={disabled}
              onClick={() => {
                onChange(
                  value.filter((candidate) => {
                    return candidate !== choice.value;
                  }),
                );
              }}
              className="flex size-6 shrink-0 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-3.5">
                <path d="M6 6l8 8m0-8-8 8" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
};
