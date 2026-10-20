import { useFieldId, type ChoiceListProps } from 'awaitio/ui';
import type { FC } from 'react';

// Options as a list of cards to pick from, for a short list; a long one reads better as a Select.
export const ChoiceList: FC<ChoiceListProps> = ({ choices, mode, value, onChange, disabled }) => {
  const name = useFieldId();

  return (
    <div role={mode === 'single' ? 'radiogroup' : 'group'} id={name} className="flex flex-col gap-2">
      {choices.map((choice) => {
        const isChosen = value.includes(choice.value);

        return (
          <label
            key={choice.value}
            className={['flex cursor-pointer items-start gap-3 rounded-md border bg-white px-3 py-2.5 text-sm', isChosen && 'border-gray-900', !isChosen && 'border-gray-300 hover:border-gray-400']
              .filter(Boolean)
              .join(' ')}
          >
            <input
              type={mode === 'single' ? 'radio' : 'checkbox'}
              name={name}
              checked={isChosen}
              disabled={disabled}
              onChange={() => {
                if (mode === 'single') {
                  onChange([choice.value]);

                  return;
                }

                onChange(
                  isChosen
                    ? value.filter((chosen) => {
                        return chosen !== choice.value;
                      })
                    : [...value, choice.value],
                );
              }}
              className="mt-0.5 accent-gray-900"
            />
            <span className="flex flex-col gap-0.5">
              <span className="font-medium">{choice.label}</span>
              {choice.description && <span className="text-gray-500">{choice.description}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
};
