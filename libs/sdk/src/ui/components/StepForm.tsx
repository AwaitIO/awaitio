import { Fragment, useState, type FC, type FormEvent } from 'react';
import { match } from 'ts-pattern';
import type { ComponentUi } from '../../client/types/ComponentUi';
import type { Step } from '../../shared/types/Step';
import { Button } from '../../uikit/Button';
import { Card } from '../../uikit/Card';
import { Field } from '../../uikit/Field';
import { ApiError } from '../api/ApiError';
import { respondToStep } from '../api/respondToStep';
import { toErrorMessage } from '../utils/toErrorMessage';

export type StepFormProps = {
  runId: string;
  step: Step;
  uis: Map<string, ComponentUi<unknown, unknown>>;
};

// One step of a running action: every component the handler awaited at once (io.group) as one form.
// Rendered with key = stepId, so a new step starts with fresh state.
export const StepForm: FC<StepFormProps> = ({ runId, step, uis }) => {
  const [values, setValues] = useState(() => {
    return step.components.map((component) => {
      return uis.get(component.type)?.initialValue?.(component.props);
    });
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // A component with its own buttons (io.confirm) sends the step itself, so the form has no Continue button.
  const hasSubmitButton = step.components.every((component) => {
    return uis.get(component.type)?.submitButton !== false;
  });

  const send = async (sentValues: unknown[]) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // On success the server publishes the next state and this form unmounts.
      await respondToStep({ runId, stepId: step.stepId, values: sentValues });
    } catch (error) {
      // A validation error comes back through the state stream as step.errors, shown under each field.
      if (!(error instanceof ApiError && error.code === 'VALIDATION_ERROR')) {
        setErrorMessage(toErrorMessage(error));
      }

      setIsSubmitting(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send(values);
  };

  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-4">
        {/* The first step needs no number; from the second one on it tells the user the action goes on. */}
        {step.index > 1 && <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">Step {step.index}</p>}
        {step.components.map((component, index) => {
          const ui = uis.get(component.type);

          if (!ui) {
            return (
              <p key={index} className="text-sm text-red-600">
                {component.label}: no UI is registered for {component.type}.
              </p>
            );
          }

          const control = (
            <ui.component
              label={component.label}
              props={component.props}
              value={values[index]}
              autoFocus={index === 0}
              disabled={isSubmitting || component.disabled === true}
              error={step.errors[index] ?? null}
              onChange={(value) => {
                setValues((previous) => {
                  return previous.map((previousValue, valueIndex) => {
                    return valueIndex === index ? value : previousValue;
                  });
                });
              }}
              submit={(value) => {
                const sentValues = values.map((previousValue, valueIndex) => {
                  return valueIndex === index ? value : previousValue;
                });
                setValues(sentValues);
                void send(sentValues);
              }}
            />
          );

          // Components draw only the control; the label and help text around it are the same everywhere.
          if (ui.wrap === false) {
            return <Fragment key={index}>{control}</Fragment>;
          }

          return (
            <Field key={index} label={component.label} helpText={typeof component.props.helpText === 'string' ? component.props.helpText : undefined} error={step.errors[index]}>
              {control}
            </Field>
          );
        })}
        {(step.message ?? errorMessage) && <p className="text-sm text-red-600">{step.message ?? errorMessage}</p>}
        {hasSubmitButton && (
          <div>
            <Button type="submit" disabled={isSubmitting}>
              {match(isSubmitting)
                .with(true, () => 'Submitting…')
                .with(false, () => 'Continue')
                .exhaustive()}
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
};
