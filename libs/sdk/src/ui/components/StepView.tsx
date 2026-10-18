import { match } from 'ts-pattern';
import { LoadingIndicator } from './LoadingIndicator';
import { StepForm } from './StepForm';
import type { Step } from '../../shared/types/Step';
import { componentUiRegistry } from '../componentUiRegistry';
import { useUiScripts } from '../hooks/useUiScripts';
import type { FC } from 'react';

export type StepViewProps = {
  runId: string;
  step: Step;
};

// Loads the UI scripts of the step's components first, then shows the form.
export const StepView: FC<StepViewProps> = ({ runId, step }) => {
  const componentUis = useUiScripts({
    registry: componentUiRegistry,
    types: step.components.map((component) => {
      return component.type;
    }),
  });

  return match(componentUis)
    .with({ status: 'loading' }, () => {
      return <LoadingIndicator loading={{ label: 'Loading the form…', description: null }} />;
    })
    .with({ status: 'error' }, ({ message }) => {
      return <p className="text-sm text-red-600">{message}</p>;
    })
    .with({ status: 'ready' }, ({ uis }) => {
      return <StepForm runId={runId} step={step} uis={uis} />;
    })
    .exhaustive();
};
